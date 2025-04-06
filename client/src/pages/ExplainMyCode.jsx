import React, { useState } from "react";

const ExplainMyCode = () => {

    
  const [code, setCode] = useState("");
  const [explanation, setExplanation] = useState("");
  const [loading, setLoading] = useState(false);
  const handleExplain = async () => {
    setLoading(true);
    try {
      
     
       const res = await fetch("https://codebuddy-ai-backend.onrender.com/api/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      
      const data = await res.json();
      setExplanation(data.explanation || data.response || "No explanation returned.");
    } catch (err) {
      setExplanation("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

return (
    <div className="container py-5" style={{ marginTop: "3.5rem" }}>
        <div className="row justify-content-center">
            <div className="col-lg-10">
                <div className="card shadow border-0">
                    <div className="card-body p-5">
                        <h1 className="card-title text-primary mb-3 display-5">
                            🧠 Explain My Code
                        </h1>
                        <p className="text-muted mb-4 fs-5">
                            Paste your code below and let <strong className="text-primary">CodeBuddy.AI</strong> explain it clearly.
                        </p>

                        <div className="mb-4">
                            <textarea
                                className="form-control font-monospace bg-light text-dark"
                                rows="10"
                                placeholder="Paste your code here..."
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                style={{ whiteSpace: "pre", overflowX: "auto" }}
                            />
                        </div>

                        <div className="d-grid gap-2 mb-4">
                            <button
                                onClick={handleExplain}
                                className="btn btn-primary btn-lg"
                                disabled={loading}
                            >
                                {loading ? "Explaining..." : "Explain Code"}
                            </button>
                        </div>

                        {explanation && (
                            <div className="mt-4">
                                <h4 className="mb-3 fw-semibold">✨ AI Explanation</h4>
                                <div
                                    className="bg-dark text-success p-4 rounded"
                                    style={{
                                        maxHeight: "400px",
                                        overflowY: "auto",
                                        whiteSpace: "pre-wrap",
                                        fontFamily: "monospace",
                                        fontSize: "0.95rem",
                                    }}
                                >
                                    {explanation}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </div>
);
};

export default ExplainMyCode;
