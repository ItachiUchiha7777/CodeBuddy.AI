from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
import requests

load_dotenv()

app = Flask(__name__)
CORS(app)

API_KEY = os.getenv("GEMINI_API_KEY")
MODEL = "models/gemini-1.5-pro"
URL = f"https://generativelanguage.googleapis.com/v1beta/{MODEL}:generateContent?key={API_KEY}"


@app.route("/api/",methods=["GET"])
def test():
    return jsonify({"response": "HEllo ITS WORKING"})

@app.route("/api/ask", methods=["POST"])
def ask_gemini():
    question = request.json.get("question", "")
    payload = {"contents": [{"parts": [{"text": question}]}]}

    response = requests.post(URL, json=payload)
    if response.status_code != 200:
        return jsonify({"error": response.text}), response.status_code

    data = response.json()
    text = (
        data.get("candidates", [{}])[0]
        .get("content", {})
        .get("parts", [{}])[0]
        .get("text", "No response")
    )
    return jsonify({"response": text})


@app.route("/api/explain", methods=["POST"])
def explain_code():
    data = request.get_json()
    code = data.get("code", "")
    prompt = f"Please explain the following code in simple terms:\n\n{code}"

    payload = {"contents": [{"parts": [{"text": prompt}]}]}

    response = requests.post(URL, json=payload)
    if response.status_code != 200:
        return jsonify({"error": response.text}), response.status_code

    data = response.json()
    explanation = (
        data.get("candidates", [{}])[0]
        .get("content", {})
        .get("parts", [{}])[0]
        .get("text", "No explanation")
    )

    return jsonify({"explanation": explanation})

@app.route("/api/roadmap", methods=["POST"])
def roadmap():
    question = request.json.get("question", "")
    
    
    prompt = f"""
You are an expert AI roadmap generator.

Create a well-structured learning roadmap for the following topic:

**{question}**

The roadmap should:
- Begin with a short introduction.
- Be divided into clear phases: **Phase 1 (Basics)**, **Phase 2 (Intermediate)**, **Phase 3 (Advanced)**, and **Conclusion**.
- Use proper Markdown formatting:
  - Headings: `##` for section titles
  - Subheadings: `**bold**`
  - Bullets: `*` for listing items
  - No step numbering like "Step 1", "Step 2", etc.
- Be clean, readable, and suitable for display in a web `pre` tag.
"""

    payload = {
        "contents": [{
            "parts": [{"text": prompt}]
        }]
    }

    response = requests.post(URL, json=payload)

    if response.status_code != 200:
        return jsonify({"error": response.text}), response.status_code

    data = response.json()
    roadmap_text = data.get("candidates", [{}])[0].get("content", {}).get("parts", [{}])[0].get("text", "No roadmap generated")

    return jsonify({"roadmap": roadmap_text})

if __name__ == "__main__":
    app.run(debug=True)
