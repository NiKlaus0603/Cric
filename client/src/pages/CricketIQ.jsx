import React, { useState } from 'react';

const quizData = {
  question: "Who holds the record for the fastest century in ODIs?",
  options: ["AB de Villiers", "Virat Kohli", "Chris Gayle", "Shahid Afridi"],
  answer: "AB de Villiers"
};

const CricketIQ = () => {
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState("");

  const handleSubmit = () => {
    if (selected === quizData.answer) {
      setResult("✅ Correct! You're a cricket genius.");
    } else {
      setResult(`❌ Oops! The right answer is ${quizData.answer}.`);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 text-center bg-white dark:bg-slate-800 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">🧠 Today's Cricket IQ</h2>
      <p className="text-lg mb-6">{quizData.question}</p>
      <div className="grid gap-2 mb-4">
        {quizData.options.map((opt) => (
          <button
            key={opt}
            onClick={() => setSelected(opt)}
            className={`border px-4 py-2 rounded ${selected === opt ? 'bg-blue-600 text-white' : 'dark:bg-slate-700 text-black dark:text-white'}`}
          >
            {opt}
          </button>
        ))}
      </div>
      <button onClick={handleSubmit} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
        Submit
      </button>
      {result && <p className="mt-4 text-lg">{result}</p>}
    </div>
  );
};

export default CricketIQ;
