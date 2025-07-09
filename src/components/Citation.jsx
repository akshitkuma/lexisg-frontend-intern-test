import React, { useState } from 'react';

const Citation = ({ text, source, para, link }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleCitationClick = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Create a mock PDF viewer with highlighted paragraph
    const pdfWindow = window.open('', '_blank');
    pdfWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>${source} - Judgment PDF</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            line-height: 1.6;
          }
          .header {
            background: #f8f9fa;
            padding: 15px;
            margin-bottom: 20px;
            border-bottom: 1px solid #ddd;
          }
          .document {
            max-width: 800px;
            margin: 0 auto;
          }
          .page {
            margin-bottom: 40px;
          }
          .paragraph {
            margin-bottom: 15px;
            padding: 5px;
            border-left: 3px solid transparent;
          }
          .highlighted {
            background-color: rgba(255, 255, 0, 0.3);
            border-left: 3px solid #ffc107;
            padding: 10px;
            margin: 10px 0;
          }
          .para-marker {
            display: inline-block;
            background: #6c757d;
            color: white;
            padding: 2px 6px;
            border-radius: 3px;
            font-size: 0.8em;
            margin-right: 8px;
          }
          .download-btn {
            display: inline-block;
            background: #0d6efd;
            color: white;
            padding: 8px 15px;
            border-radius: 4px;
            text-decoration: none;
            margin-top: 20px;
          }
          .simulation-notice {
            background: #fff3cd;
            padding: 10px;
            border-radius: 4px;
            margin-bottom: 20px;
            border-left: 3px solid #ffc107;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h2>${source}</h2>
          <p>Judgment Document Viewer</p>
        </div>

        <div class="document">
          <div class="simulation-notice">
            <strong>Simulation:</strong> In a production environment, this would display the actual PDF document.
          </div>

          <div class="page">
            <h3>Judgment Text</h3>
            
            <div class="paragraph">[Legal preamble and introductory content...]</div>
            <div class="paragraph">[Case background and facts...]</div>
            <div class="paragraph">[Legal arguments presented...]</div>
            <div class="paragraph">[Tribunal's analysis part 1...]</div>
            <div class="paragraph">[Tribunal's analysis part 2...]</div>
            <div class="paragraph">[Discussion of evidence...]</div>
            <div id="para-7" class="paragraph highlighted">
              <span class="para-marker">Para 7</span>
              <strong>Key Finding:</strong> "${text}"
            </div>
            <div class="paragraph">[Additional considerations...]</div>
            <div class="paragraph">[Final orders and conclusion...]</div>
          </div>

          <a href="${link}" download="${source.replace(/\s+/g, '_')}.pdf" class="download-btn">
            Download Full Judgment PDF
          </a>
        </div>

        <script>
          // Scroll to the highlighted paragraph
          document.getElementById('para-${para}').scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        </script>
      </body>
      </html>
    `);
    pdfWindow.document.close();
    setIsLoading(false);
  };

  return (
    <div 
      className={`bg-white p-3 rounded border border-gray-200 text-sm cursor-pointer hover:bg-gray-50 transition-colors ${
        isLoading ? 'bg-blue-50' : ''
      }`}
      onClick={handleCitationClick}
    >
      <p className="text-gray-700 italic">"{text}"</p>
      <p className="text-gray-500 mt-1">
        {source} {para && `(Para ${para})`}
      </p>
      {isLoading && (
        <p className="text-blue-600 text-xs mt-1">Opening document...</p>
      )}
    </div>
  );
};

export default Citation;