import { create } from 'zustand';
import { Chess } from 'chess.js';
import { Position, Piece, GameState } from '../types/chess';
import { initializeBoard } from '../utils/boardUtils';
import { positionToSquare } from '../utils/pgnUtils';

interface GameStore {
  board: (Piece | null)[][];
  selectedPiece: { piece: Piece; position: Position } | null;
  currentPlayer: 'white' | 'black';
  gameState: GameState;
  moveHistory: string[];
  chess: Chess;
  setSelectedPiece: (piece: { piece: Piece; position: Position } | null) => void;
  makeMove: (from: Position, to: Position) => boolean;
  loadPGN: (pgn: string) => void;
  getPGN: () => string;
  resetGame: () => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  board: initializeBoard(),
  selectedPiece: null,
  currentPlayer: 'white',
  gameState: 'playing',
  moveHistory: [],
  chess: new Chess(),

  setSelectedPiece: (piece) => set({ selectedPiece: piece }),

  makeMove: (from, to) => {
    const { chess, moveHistory } = get();
    const fromSquare = positionToSquare(from);
    const toSquare = positionToSquare(to);

    try {
      const move = chess.move({
        from: fromSquare,
        to: toSquare,
        promotion: 'q'
      });

      if (move) {
        const newBoard = initializeBoard(); // Reset board and apply all moves
        set({
          board: newBoard,
          currentPlayer: chess.turn() === 'w' ? 'white' : 'black',
          moveHistory: [...moveHistory, move.san],
          gameState: chess.isCheckmate() 
            ? 'checkmate' 
            : chess.isStalemate() 
              ? 'stalemate' 
              : chess.isCheck() 
                ? 'check' 
                : 'playing'
        });
        return true;
      }
    } catch (e) {
      console.error('Invalid move:', e);
    }
    return false;
  },

  loadPGN: (pgn) => {
    const { chess } = get();
    try {
      chess.loadPgn(pgn);
      set({
        board: initializeBoard(),
        currentPlayer: 'white',
        selectedPiece: null,
        moveHistory: chess.history(),
        gameState: 'playing'
      });
    } catch (e) {
      console.error('Invalid PGN:', e);
    }
  },

  getPGN: () => {
    const { chess } = get();
    return chess.pgn();
  },

  resetGame: () => {
    const { chess } = get();
    chess.reset();
    set({
      board: initializeBoard(),
      currentPlayer: 'white',
      selectedPiece: null,
      moveHistory: [],
      gameState: 'playing'
    });
  }
}));