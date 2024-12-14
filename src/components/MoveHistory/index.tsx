import React from 'react';
import { useGameStore } from '../../store/useGameStore';

const MoveHistory: React.FC = () => {
  const { moveHistory } = useGameStore();

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-2">Move History</h2>
      <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
        {moveHistory.map((move, index) => (
          <div key={index} className="text-sm">
            {index % 2 === 0 && (
              <span className="text-gray-500 mr-2">
                {Math.floor(index / 2) + 1}.
              </span>
            )}
            {move}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoveHistory;