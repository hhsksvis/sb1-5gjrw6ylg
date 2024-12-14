import { Position, Piece } from '../../types/chess';

export const getRookMoves = (
  position: Position,
  piece: Piece,
  board: (Piece | null)[][]
): Position[] => {
  const moves: Position[] = [];
  const directions = [
    { row: -1, col: 0 }, // up
    { row: 1, col: 0 },  // down
    { row: 0, col: -1 }, // left
    { row: 0, col: 1 }   // right
  ];

  for (const direction of directions) {
    let currentRow = position.row + direction.row;
    let currentCol = position.col + direction.col;

    while (currentRow >= 0 && currentRow < 8 && currentCol >= 0 && currentCol < 8) {
      const targetPiece = board[currentRow][currentCol];
      
      if (!targetPiece) {
        moves.push({ row: currentRow, col: currentCol });
      } else {
        if (targetPiece.color !== piece.color) {
          moves.push({ row: currentRow, col: currentCol });
        }
        break;
      }

      currentRow += direction.row;
      currentCol += direction.col;
    }
  }

  return moves;
};