import { Position, Piece } from '../../types/chess';
import { getBishopMoves } from './bishopMoves';
import { getRookMoves } from './rookMoves';

export const getQueenMoves = (
  position: Position,
  piece: Piece,
  board: (Piece | null)[][]
): Position[] => {
  // Queen moves are a combination of bishop and rook moves
  return [
    ...getBishopMoves(position, piece, board),
    ...getRookMoves(position, piece, board)
  ];
};