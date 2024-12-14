import React from 'react';
import Board from './components/Board';
import MoveHistory from './components/MoveHistory';
import PGNInput from './components/PGNInput';
import GameControls from './components/GameControls';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">FreeCHESS</h1>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-8">
          <Board />
          <GameControls />
        </div>
        <div className="space-y-8">
          <MoveHistory />
          <PGNInput />
        </div>
      </div>
    </div>
  );
}

export default App;