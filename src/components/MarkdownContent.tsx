
import React from "react";

interface MarkdownContentProps {
  content: string;
}

// A simple markdown-like renderer
// In a real application, you'd use a proper markdown library like react-markdown
export const MarkdownContent: React.FC<MarkdownContentProps> = ({ content }) => {
  // Split the content into lines
  const lines = content.split("\n");
  
  // Process each line
  const processedLines = lines.map((line, index) => {
    // Heading 1
    if (line.startsWith("# ")) {
      return <h1 key={index} className="text-3xl font-bold mt-6 mb-4">{line.substring(2)}</h1>;
    }
    // Heading 2
    else if (line.startsWith("## ")) {
      return <h2 key={index} className="text-2xl font-bold mt-5 mb-3">{line.substring(3)}</h2>;
    }
    // Heading 3
    else if (line.startsWith("### ")) {
      return <h3 key={index} className="text-xl font-bold mt-4 mb-2">{line.substring(4)}</h3>;
    }
    // Unordered list item
    else if (line.startsWith("- ")) {
      return <li key={index} className="ml-6 list-disc my-1">{line.substring(2)}</li>;
    }
    // Ordered list item
    else if (/^\d+\.\s/.test(line)) {
      const content = line.replace(/^\d+\.\s/, "");
      return <li key={index} className="ml-6 list-decimal my-1">{content}</li>;
    }
    // Bold text
    else if (line.includes("**")) {
      let parts = line.split("**");
      return (
        <p key={index} className="my-2">
          {parts.map((part, i) => 
            i % 2 === 0 ? 
              part : 
              <strong key={i}>{part}</strong>
          )}
        </p>
      );
    }
    // Empty line
    else if (line.trim() === "") {
      return <br key={index} />;
    }
    // Regular paragraph
    else {
      return <p key={index} className="my-2">{line}</p>;
    }
  });

  return <div className="prose max-w-none">{processedLines}</div>;
};
