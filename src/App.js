import React from 'react';
import ChatInterface from './components/ChatInterface';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="container mx-auto max-w-4xl p-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Lexi Legal Assistant</h1>
        <ChatInterface />
      </div>
    </div>
  );
}

export default App;