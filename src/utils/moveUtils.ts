import { Position, Piece } from '../types/chess';
import { getPawnMoves } from './moves/pawnMoves';
import { getRookMoves } from './moves/rookMoves';
import { getKnightMoves } from './moves/knightMoves';
import { getBishopMoves } from './moves/bishopMoves';
import { getQueenMoves } from './moves/queenMoves';
import { getKingMoves } from './moves/kingMoves';

export const isValidMove = (
  from: Position,
  to: Position,
  board: (Piece | null)[][],
  currentPlayer: 'white' | 'black'
): boolean => {
  const piece = board[from.row][from.col];
  const targetPiece = board[to.row][to.col];

  if (!piece || piece.color !== currentPlayer) {
    return false;
  }

  if (targetPiece && targetPiece.color === currentPlayer) {
    return false;
  }

  const validMoves = getValidMoves(from, piece, board);
  return validMoves.some(move => move.row === to.row && move.col === to.col);
};

export const getValidMoves = (
  position: Position,
  piece: Piece,
  board: (Piece | null)[][]
): Position[] => {
  switch (piece.type) {
    case 'pawn':
      return getPawnMoves(position, piece, board);
    case 'rook':
      return getRookMoves(position, piece, board);
    case 'knight':
      return getKnightMoves(position, piece, board);
    case 'bishop':
      return getBishopMoves(position, piece, board);
    case 'queen':
      return getQueenMoves(position, piece, board);
    case 'king':
      return getKingMoves(position, piece, board);
    default:
      return [];
  }
};