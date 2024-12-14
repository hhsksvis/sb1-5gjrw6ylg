import { Position, Piece } from '../../types/chess';

export const getBishopMoves = (
  position: Position,
  piece: Piece,
  board: (Piece | null)[][]
): Position[] => {
  const moves: Position[] = [];
  const directions = [
    { row: -1, col: -1 }, // up-left
    { row: -1, col: 1 },  // up-right
    { row: 1, col: -1 },  // down-left
    { row: 1, col: 1 }    // down-right
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