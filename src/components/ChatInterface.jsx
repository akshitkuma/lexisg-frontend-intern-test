import React, { useState } from 'react';
import { IoSend } from 'react-icons/io5';
import Message from './Message';

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    setMessages([...messages, { text: input, isUser: true }]);
    setInput('');

    // Simulate API call
    setTimeout(() => {
      const response = {
        answer:
          "Yes, under Section 166 of the Motor Vehicles Act, 1988, the claimants are entitled to an addition for future prospects even when the deceased was self-employed and aged 54–55 years at the time of the accident. In Dani Devi v. Pritam Singh, the Court held that 10% of the deceased's annual income should be added as future prospects.",
        citations: [
          {
            text:
              "as the age of the deceased at the time of accident was held to be about 54-55 years by the learned Tribunal, being self-employed, as such, 10% of annual income should have been awarded on account of future prospects.",
            source: 'Dani Devi v. Pritam Singh',
            link: 'https://lexisingapore-my.sharepoint.com/:b:/g/personal/harshit_lexi_sg/EdOegeiR_gdBvQxdyW4xE6oBCDgj5E4Bo5wjvhPHpqgIuQ?e=TEu4vz',
            para: 7,
          },
        ],
      };

      setMessages((prev) => [
        ...prev,
        {
          text: response.answer,
          isUser: false,
          citations: response.citations,
        },
      ]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen bg-white rounded-lg shadow-lg">
      {/* Scrollable chat messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            Ask a legal question to get started
          </div>
        ) : (
          messages.map((message, index) => (
            <Message
              key={index}
              text={message.text}
              isUser={message.isUser}
              citations={message.citations}
            />
          ))
        )}

        {isLoading && (
          <div className="flex items-center justify-start">
            <div className="bg-gray-100 p-4 rounded-lg max-w-3/4 animate-pulse">
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
          </div>
        )}
      </div>

      {/* Input box fixed at bottom */}
      <form
        onSubmit={handleSubmit}
        className="border-t border-gray-200 px-4 py-3 bg-white sticky bottom-0 w-full z-10"
      >
        <div className="flex items-center w-full">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a legal question..."
            className="flex-grow w-full border border-gray-300 rounded-l-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-3 px-6 rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors min-w-[60px]"
            disabled={!input.trim()}
          >
            <IoSend className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;
