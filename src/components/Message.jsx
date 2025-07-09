import React from 'react';
import Citation from './Citation';

const Message = ({ text, isUser, citations }) => {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-3/4 p-4 rounded-lg ${
          isUser ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'
        }`}
      >
        <p className="whitespace-pre-wrap">{text}</p>
        {citations && (
          <div className="mt-3 space-y-2">
            {citations.map((citation, index) => (
              <Citation
                key={index}
                text={citation.text}
                source={citation.source}
                link={citation.link}
                para={citation.para}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;