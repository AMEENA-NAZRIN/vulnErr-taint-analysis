from flask import Flask, request, jsonify
from flask_cors import CORS
from analyzer import analyze_code
import os
from database import get_connection, create_table

app = Flask(__name__)
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

create_table()


app = Flask(__name__)
@app.route("/upload", methods=["POST"])
def upload_file():
    file = request.files["file"]

    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
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
    print("Saved to DB:", file.filename, result["status"])


    return jsonify(result)

CORS(app)  


@app.route("/analyze", methods=["POST"])
def analyze():
    code = request.files["file"].read().decode("utf-8")
    result = analyze_code(code)
    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)
