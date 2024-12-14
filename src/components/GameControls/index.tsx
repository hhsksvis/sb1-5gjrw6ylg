import React from 'react';
import { useGameStore } from '../../store/useGameStore';

const GameControls: React.FC = () => {
  const { resetGame, gameState, currentPlayer } = useGameStore();

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <div className="text-lg font-semibold">
          Current Turn: {currentPlayer}
        </div>
        <div className="text-lg font-semibold">
          State: {gameState}
        </div>
      </div>
      <button
        onClick={resetGame}
        className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
      >
        New Game
      </button>
    </div>
  );
};

export default GameControls;