import React, { useState } from 'react';
import { useGameStore } from '../../store/useGameStore';

const PGNInput: React.FC = () => {
  const [pgn, setPgn] = useState('');
  const { loadPGN, getPGN } = useGameStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadPGN(pgn);
    setPgn('');
  };

  const handleExport = () => {
    const currentPGN = getPGN();
    navigator.clipboard.writeText(currentPGN)
      .then(() => alert('PGN copied to clipboard!'))
      .catch(err => console.error('Failed to copy PGN:', err));
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-2">PGN Tools</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={pgn}
          onChange={(e) => setPgn(e.target.value)}
          className="w-full h-32 p-2 border rounded"
          placeholder="Paste PGN here..."
        />
        <div className="flex gap-2">
          <button
            type="submit"
            className="flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Load Game
          </button>
          <button
            type="button"
            onClick={handleExport}
            className="flex-1 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
          >
            Export PGN
          </button>
        </div>
      </form>
    </div>
  );
};

export default PGNInput;