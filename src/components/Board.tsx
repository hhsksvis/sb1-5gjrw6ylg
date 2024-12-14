import React from 'react';
import Square from './Square';
import { useChessGame } from '../hooks/useChessGame';
import { Position } from '../types/chess';

const Board: React.FC = () => {
  const { board, selectedPiece, handleSquareClick } = useChessGame();

  return (
    <div className="grid grid-cols-8 w-fit border border-gray-800">
      {board.map((row, i) =>
        row.map((piece, j) => {
          const position: Position = { row: i, col: j };
          const isSelected = selectedPiece?.position.row === i && selectedPiece?.position.col === j;

          return (
            <Square
              key={`${i}-${j}`}
              position={position}
              piece={piece}
              isSelected={isSelected}
              onClick={() => handleSquareClick(position)}
            />
          );
        })
      )}
    </div>
  );
};

export default Board;