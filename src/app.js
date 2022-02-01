import './app.css';
import React, { useRef, useState } from 'react';
import Game from './components/Game';
export default function App() {
  const [player, setPlayer] = useState(null);
  const playerName = useRef('');
  return (
    <div>
      {player ? (
        <Game playerName={player} />
      ) : (
        <div className='playerInfo'>
          <h1>Type your name </h1>
          <input
            ref={playerName}
            type='text'
            placeholder='Enter player name here...'
          />
          <button
            onClick={() => {
              setPlayer(playerName.current.value);
            }}
          >
            Start Game
          </button>
        </div>
      )}
    </div>
  );
}
