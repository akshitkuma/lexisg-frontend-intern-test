import React, { useState, useEffect } from 'react';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const PDFViewer = ({ url, highlightText, para, onClose }) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    if (highlightText) {
      // Extract key terms for highlighting
      const searchTerms = highlightText.split(' ').slice(0, 5).join(' ');
      setSearchText(searchTerms);
    }
  }, [highlightText]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl h-[90vh] flex flex-col">
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-lg font-semibold">Document Viewer - {para && `Paragraph ${para}`}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-hidden">
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <Viewer
              fileUrl={url}
              plugins={[defaultLayoutPluginInstance]}
              initialPage={0}
              search={{ keyword: searchText }}
            />
          </Worker>
        </div>
        <div className="border-t p-3 bg-gray-50">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Relevant text:</span> "{highlightText}"
          </p>
          {para && <p className="text-sm text-gray-600 mt-1">
            <span className="font-medium">Paragraph:</span> {para}
          </p>}
        </div>
      </div>
    </div>
  );
};

export default PDFViewer;