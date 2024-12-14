import React from 'react';
import clsx from 'clsx';
import { Position, Piece } from '../../types/chess';
import { getPieceImage } from '../../utils/pieceUtils';

interface SquareProps {
  position: Position;
  piece: Piece | null;
  isSelected: boolean;
  isValidMove?: boolean;
  onClick: () => void;
}

const Square: React.FC<SquareProps> = ({ 
  position, 
  piece, 
  isSelected, 
  isValidMove = false,
  onClick 
}) => {
  const isLightSquare = (position.row + position.col) % 2 === 0;
  
  const squareClasses = clsx(
    'w-16 h-16 flex items-center justify-center cursor-pointer transition-colors',
    {
      'bg-amber-100': isLightSquare && !isSelected && !isValidMove,
      'bg-amber-800': !isLightSquare && !isSelected && !isValidMove,
      'ring-2 ring-blue-500 bg-blue-100': isSelected,
      'ring-2 ring-green-500 bg-green-100': isValidMove
    }
  );

  return (
    <div className={squareClasses} onClick={onClick}>
      {piece && (
        <img
          src={getPieceImage(piece)}
          alt={`${piece.color} ${piece.type}`}
          className="w-12 h-12 select-none"
          draggable={false}
        />
      )}
    </div>
  );
};