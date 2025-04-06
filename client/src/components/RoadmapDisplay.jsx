import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const RoadmapDisplay = ({ roadmap }) => {
  return (
    <div className="prose max-w-3xl mx-auto p-4 bg-white rounded-xl shadow-md text-gray-800">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{roadmap}</ReactMarkdown>
    </div>
  );
};

export default RoadmapDisplay;
