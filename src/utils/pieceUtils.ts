import { Piece } from '../types/chess';

export const getPieceImage = (piece: Piece): string => {
  const color = piece.color === 'white' ? 'w' : 'b';
  const type = piece.type.charAt(0);
  return `/pieces/${color}${type}.png`;
};