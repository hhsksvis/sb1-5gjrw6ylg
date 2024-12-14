import { Position, Piece } from '../../types/chess';

export const getPawnMoves = (
  position: Position,
  piece: Piece,
  board: (Piece | null)[][]
): Position[] => {
  const moves: Position[] = [];
  const direction = piece.color === 'white' ? -1 : 1;
  const newRow = position.row + direction;

  // Forward move
  if (newRow >= 0 && newRow < 8 && !board[newRow][position.col]) {
    moves.push({ row: newRow, col: position.col });

    // Initial two-square move
    if (
      (piece.color === 'white' && position.row === 6) ||
      (piece.color === 'black' && position.row === 1)
    ) {
      const twoSquaresRow = position.row + 2 * direction;
      if (!board[twoSquaresRow][position.col]) {
        moves.push({ row: twoSquaresRow, col: position.col });
      }
    }
  }

  // Capture moves
  const captureCols = [position.col - 1, position.col + 1];
  for (const captureCol of captureCols) {
    if (captureCol >= 0 && captureCol < 8) {
      const targetPiece = board[newRow]?.[captureCol];
      if (targetPiece && targetPiece.color !== piece.color) {
        moves.push({ row: newRow, col: captureCol });
      }
    }
  }

  return moves;
};