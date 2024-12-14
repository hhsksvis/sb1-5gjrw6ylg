import React from 'react';
import { Position, Piece } from '../types/chess';
import { getPieceImage } from '../utils/pieceUtils';

interface SquareProps {
  position: Position;
  piece: Piece | null;
  isSelected: boolean;
  onClick: () => void;
}

const Square: React.FC<SquareProps> = ({ position, piece, isSelected, onClick }) => {
  const isLightSquare = (position.row + position.col) % 2 === 0;
  const backgroundColor = isLightSquare ? 'bg-amber-100' : 'bg-amber-800';
  const selectedClass = isSelected ? 'ring-2 ring-blue-500' : '';

  return (
    <div
      className={`w-16 h-16 flex items-center justify-center ${backgroundColor} ${selectedClass} cursor-pointer`}
      onClick={onClick}
    >
      {piece && (
        <img
          src={getPieceImage(piece)}
          alt={`${piece.color} ${piece.type}`}
          className="w-12 h-12"
        />
      )}
    </div>
  );
};

export default Square;