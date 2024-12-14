import React from 'react';
import Square from './Square';
import { useGameStore } from '../../store/useGameStore';
import { Position } from '../../types/chess';
import { getValidMoves } from '../../utils/moveUtils';

const Board: React.FC = () => {
  const { 
    board, 
    selectedPiece, 
    currentPlayer,
    setSelectedPiece, 
    makeMove 
  } = useGameStore();

  const handleSquareClick = (position: Position) => {
    const piece = board[position.row][position.col];

    if (selectedPiece) {
      if (makeMove(selectedPiece.position, position)) {
        setSelectedPiece(null);
      } else if (piece && piece.color === currentPlayer) {
        setSelectedPiece({ piece, position });
      } else {
        setSelectedPiece(null);
      }
    } else if (piece && piece.color === currentPlayer) {
      setSelectedPiece({ piece, position });
    }
  };

  const validMoves = selectedPiece 
    ? getValidMoves(selectedPiece.position, selectedPiece.piece, board)
    : [];

  return (
    <div className="grid grid-cols-8 w-fit border border-gray-800">
      {board.map((row, i) =>
        row.map((piece, j) => {
          const position: Position = { row: i, col: j };
          const isSelected = selectedPiece?.position.row === i && 
                           selectedPiece?.position.col === j;
          const isValidMove = validMoves.some(
            move => move.row === i && move.col === j
          );

          return (
            <Square
              key={`${i}-${j}`}
              position={position}
              piece={piece}
              isSelected={isSelected}
              isValidMove={isValidMove}
              onClick={() => handleSquareClick(position)}
            />
          );
        })
      )}
    </div>
  );
};

export default Board;