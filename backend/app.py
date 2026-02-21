from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from database import get_connection
from psycopg2.extras import RealDictCursor
import psycopg2
import bcrypt
from analyzer import analyze_code
from llama_suggester import get_taint_fix_suggestions
import os
from database import get_connection
from pdf_generator import generate_pdf


app = Flask(__name__)

CORS(app, resources={
    r"/*": {
        "origins": "http://127.0.0.1:5500"
    }
})

@app.route("/upload", methods=["POST"])
def upload_file():
    file = request.files["file"]
    UPLOAD_FOLDER = "uploads"
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)
    file.save(file_path)

    with open(file_path, "r", encoding="utf-8") as f:
        code = f.read()

    result = analyze_code(code)

    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO uploaded_files (filename, filepath, result) VALUES (?, ?, ?)",
        (file.filename, file_path, result["status"])
    )
    conn.commit()
    conn.close()

    return jsonify(result)


@app.route("/analyze", methods=["POST"])
def analyze():
    code = request.files["file"].read().decode("utf-8")

    result = analyze_code(code)

    suggestions = ""
    if result["status"] == "vulnerable":
        suggestions = get_taint_fix_suggestions(code)

    return jsonify({
        "status": result["status"],
        "severity": result["severity"],
        "message": result["message"],
        "ai_suggestions": suggestions
    })
@app.route("/download-report", methods=["POST"])
def download_report():
    try:
        if "file" not in request.files:
            return jsonify({"error": "No file uploaded"}), 400

        file = request.files["file"]
        user_id = request.form.get("user_id")

        if not user_id:
            return jsonify({"error": "User ID missing"}), 400

        filename = file.filename
        code = file.read().decode("utf-8")

        # Analyze
        result = analyze_code(code)

        suggestions = ""
        if result.get("status") == "vulnerable":
            suggestions = get_taint_fix_suggestions(code)

        # Generate PDF
        pdf_path = generate_pdf(filename, result, suggestions)

        # Read PDF as bytes
        with open(pdf_path, "rb") as f:
            pdf_bytes = f.read()

        conn = get_connection()
        cur = conn.cursor()

        # Insert source code
        cur.execute(
            """
            INSERT INTO source_code (user_id, filename, content)
            VALUES (%s, %s, %s)
            RETURNING id
            """,
            (user_id, filename, code)
        )

        source_code_id = cur.fetchone()[0]

        # Insert PDF report
        cur.execute(
            """
            INSERT INTO reports (user_id, source_code_id, pdf_data)
            VALUES (%s, %s, %s)
            """,
            (user_id, source_code_id, psycopg2.Binary(pdf_bytes))
        )

        conn.commit()
        cur.close()
        conn.close()

        return send_file(
            pdf_path,
            as_attachment=True,
            download_name="VulnERR_Report.pdf",
            mimetype="application/pdf"
        )

    except Exception as e:
        print("ERROR:", str(e))
        return jsonify({"error": str(e)}), 500

@app.route("/signup", methods=["POST"])
def signup():
    data = request.json
    username = data["username"]
    email = data["email"]
    password = data["password"].encode()

    hashed_password = bcrypt.hashpw(password, bcrypt.gensalt())

    conn = get_connection()
    cur = conn.cursor()

    try:
        cur.execute(
            "INSERT INTO users (username, email, password) VALUES (%s, %s, %s)",
            (username, email, hashed_password.decode())
        )
        conn.commit()
        return jsonify({"message": "User registered successfully"})
    except psycopg2.Error:
        conn.rollback()
        return jsonify({"error": "Email already exists"}), 400
    finally:
        cur.close()
        conn.close()
@app.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data["email"]
    password = data["password"].encode()

    conn = get_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)

    cur.execute("SELECT * FROM users WHERE email=%s", (email,))
    user = cur.fetchone()

    cur.close()
    conn.close()

    if user and bcrypt.checkpw(password, user["password"].encode()):
        return jsonify({
            "message": "Login successful",
            "user_id": user["id"],
            "username": user["username"]
        })
    else:
        return jsonify({"error": "Invalid credentials"}), 401

@app.route("/download/<filename>")
def download_file(filename):
    pdf_path = os.path.join("reports", filename)

    return send_file(
        pdf_path,
        as_attachment=True,
        mimetype="application/pdf"
    )

if __name__ == "__main__":
    app.run(debug=True)
