import React, { useEffect, useState } from "react";

const content = {
  quotes: [
    "The best way to get started is to quit talking and begin doing.",
    "Success is not in what you have, but who you are.",
    "Don’t let yesterday take up too much of today.",
  ],
  jokes: [
    "Why don't scientists trust atoms? Because they make up everything!",
    "Why did the bicycle fall over? Because it was two-tired!",
    "I'm reading a book about anti-gravity. It's impossible to put down!",
  ],
  tips: [
    "Drink plenty of water daily.",
    "Write down your goals and review them weekly.",
    "Stay consistent, not perfect.",
  ],
};

const TextGenerator = () => {
  const [category, setCategory] = useState("quotes");
  const [text, setText] = useState("");
  const [displayText, setDisplayText] = useState("");
  const [copySuccess, setCopySuccess] = useState("");

  const generateText = () => {
    const items = content[category];
    const randomText = items[Math.floor(Math.random() * items.length)];
    setText(randomText);
    setDisplayText("");
  };

  useEffect(() => {
    if (text) {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayText((prev) => prev + text[i]);
        i++;
        if (i >= text.length) clearInterval(interval);
      }, 40);
      return () => clearInterval(interval);
    }
  }, [text]);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopySuccess("Copied!");
    setTimeout(() => setCopySuccess(""), 1500);
  };

  return (
    <div className="bg-gray-900 border border-gray-700 shadow-xl rounded-lg p-8 max-w-xl w-full space-y-6">
      <h1 className="text-2xl font-bold text-center text-blue-400">Random Text Generator</h1>

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full bg-gray-800 text-white border border-gray-600 rounded px-4 py-2 focus:outline-none"
      >
        <option value="quotes">Quotes</option>
        <option value="jokes">Jokes</option>
        <option value="tips">Tips</option>
      </select>

      <div className="min-h-[100px] bg-gray-800 border border-gray-600 rounded p-4 font-mono text-lg">
        {displayText || "Click Generate to get text..."}
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={generateText}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
        >
          Generate
        </button>
        <button
          onClick={handleCopy}
          className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded transition"
        >
          Copy
        </button>
      </div>

      {copySuccess && (
        <p className="text-green-400 text-center text-sm">{copySuccess}</p>
      )}
    </div>
  );
};

export default TextGenerator;
