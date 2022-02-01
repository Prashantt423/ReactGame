import Board from './Board';
export default function Game({ playerName }) {
  return (
    <div>
      <Board playerName={playerName} />
    </div>
  );
}
