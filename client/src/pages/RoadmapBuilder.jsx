import React, { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./RoadmapTimeline.css"; // Custom CSS

const RoadmapBuilder = () => {
  const [topic, setTopic] = useState("");
  const [roadmap, setRoadmap] = useState([]);
  const [loading, setLoading] = useState(false);
  const pdfRef = useRef();

  const handleBuildRoadmap = async (e) => {
    e.preventDefault();
    setLoading(true);
    setRoadmap([]);

    try {
      const res = await fetch("https://codebuddy-ai-backend.onrender.com/api/roadmap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: topic }),
      });

      const data = await res.json();
      const steps = data.roadmap
        .split(/\d+\.\s|•\s|-\s|\n/)
        .filter((step) => step.trim() !== "");

      setRoadmap(steps);
    } catch (err) {
      setRoadmap(["Something went wrong. Please try again."]);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    const element = pdfRef.current;

    const clone = element.cloneNode(true);
    clone.style.marginTop = "0"; // Remove space at top
    clone.style.paddingTop = "0"; // Remove space at top

    // Add site info only for PDF
    const pdfHeader = document.createElement("div");
    pdfHeader.innerHTML = `
      <p style="font-size: 14px; margin-bottom: 10px;">
        🌐 Visit us: <a href="https://your-site-url.com">https://your-site-url.com</a> |
        🔧 Powered by <strong>RoadmapAI</strong>
      </p>
    `;
    clone.prepend(pdfHeader);

    const opt = {
      margin: [0.2, 0.5],
      filename: `${topic || "roadmap"}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    window.html2pdf().from(clone).set(opt).save();
  };

  return (
    <div  className="container py-5" style={{ marginTop: "5rem" }}>
      <div className="bg-light p-5 rounded shadow">
        <h2 className="mb-4 text-primary">📍 Roadmap Builder</h2>
        <p className="text-muted mb-4">
          Enter a topic or programming language, and let AI generate a learning roadmap for you.
        </p>

        <form onSubmit={handleBuildRoadmap}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="e.g. Python, Web Development, Data Structures"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary btn-lg"
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Roadmap"}
          </button>
        </form>

        {roadmap.length > 0 && (
          <div className="mt-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="text-success">🧠 AI-Powered Roadmap</h4>
              <button className="btn btn-outline-secondary" onClick={handleDownloadPDF}>
                📥 Download PDF
              </button>
            </div>

            <div ref={pdfRef} id="pdf-content">
              <p className="mb-2"><strong>Topic:</strong> {topic}</p>
              {roadmap.map((step, index) => (
                <div key={index} className="timeline-item mb-4">
                  <div className="timeline-dot" />
                  <div className="timeline-content">
                    <h5>Step {index + 1}</h5>
                    <p>{step}</p>
                  </div>
                </div>
              ))}
              <hr />
              <p className="text-muted small d-none">
                🌐 Visit us: <a href="https://your-site-url.com">https://your-site-url.com</a> |
                🔧 Powered by <strong>RoadmapAI</strong>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoadmapBuilder;
