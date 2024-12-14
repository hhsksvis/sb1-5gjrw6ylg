import { useState } from 'react';
import { Position, Piece, GameState } from '../types/chess';
import { initializeBoard } from '../utils/boardUtils';
import { isValidMove, getValidMoves } from '../utils/moveUtils';

export const useChessGame = () => {
  const [board, setBoard] = useState<(Piece | null)[][]>(initializeBoard());
  const [selectedPiece, setSelectedPiece] = useState<{ piece: Piece; position: Position } | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState<'white' | 'black'>('white');
  const [gameState, setGameState] = useState<GameState>('playing');

  const handleSquareClick = (position: Position) => {
    const piece = board[position.row][position.col];

    if (selectedPiece) {
      if (isValidMove(selectedPiece.position, position, board, currentPlayer)) {
        // Make the move
        const newBoard = [...board];
        newBoard[position.row][position.col] = selectedPiece.piece;
        newBoard[selectedPiece.position.row][selectedPiece.position.col] = null;
        
        setBoard(newBoard);
        setCurrentPlayer(currentPlayer === 'white' ? 'black' : 'white');
        setSelectedPiece(null);
      } else {
        // If clicking on another own piece, select it instead
        if (piece && piece.color === currentPlayer) {
          setSelectedPiece({ piece, position });
        } else {
          setSelectedPiece(null);
        }
      }
    } else {
      // Select the piece if it belongs to the current player
      if (piece && piece.color === currentPlayer) {
        setSelectedPiece({ piece, position });
      }
    }
  };

  return {
    board,
    selectedPiece,
    currentPlayer,
    gameState,
    handleSquareClick,
  };
};