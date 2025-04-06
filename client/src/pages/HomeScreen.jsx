import React, { useState } from "react";
import { askAI } from "../api";

export default function HomeScreen() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await askAI(input);
    setResponse(res.response || "No response from AI.");
    setLoading(false);
  };

  return (
    <div className="container py-3" style={{ marginTop: "100px", marginBottom: "80px" }}>
      <div className="card shadow p-3 mx-auto" style={{ maxWidth: "850px" }}>
        <h1 className="text-primary fw-bold mb-1">CodeBuddy.AI 👨‍💻</h1>
        <p className="text-muted mb-3">Your AI Coding Mentor for Beginners</p>

        <form onSubmit={handleSubmit} className="mb-2">
          <div className="mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Ask a coding question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              required
            />
          </div>

          <div className="d-grid gap-2 d-sm-flex justify-content-sm-end">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Asking..." : "Ask"}
            </button>
          </div>
        </form>

        {response && (
          <div className="mt-3">
            <h5 className="text-dark mb-2">✨ AI Response:</h5>
            <div
              className="bg-dark text-light p-3 rounded"
              style={{
                whiteSpace: "pre-wrap",
                fontFamily: "monospace",
                fontSize: "0.95rem",
                maxHeight: "40vh",
                overflowY: "auto"
              }}
            >
              {response}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}