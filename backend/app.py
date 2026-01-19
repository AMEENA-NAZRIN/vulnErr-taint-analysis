from flask import Flask, request, jsonify
from flask_cors import CORS
from analyzer import analyze_code

app = Flask(__name__)
CORS(app)  


@app.route("/analyze", methods=["POST"])
def analyze():
    code = request.files["file"].read().decode("utf-8")
    result = analyze_code(code)
    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)
