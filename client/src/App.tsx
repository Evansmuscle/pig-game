import { useState } from "react";

import { rollDice } from "./utils";

import "./App.css";

function App() {
  const [firstPlayerScore, setFirstPlayerScore] = useState(0);
  const [secondPlayerScore, setSecondPlayerScore] = useState(0);
  const [firstPlayerScoreCurrent, setFirstPlayerScoreCurrent] = useState(0);
  const [secondPlayerScoreCurrent, setSecondPlayerScoreCurrent] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState<0 | 1>(0);
  const [rolledDice, setRolledDice] = useState(0);

  const onHold = () => {
    setCurrentPlayer((val) => {
      if (val === 0) {
        setFirstPlayerScore((val) => val + firstPlayerScoreCurrent);
        setFirstPlayerScoreCurrent(0);

        return 1;
      }

      setSecondPlayerScore((val) => val + secondPlayerScoreCurrent);
      setSecondPlayerScoreCurrent(0);

      return 0;
    });
  };

  const onRoll = () => {
    setRolledDice(rollDice());

    if (currentPlayer === 0) {
      if (rolledDice === 1) {
        setFirstPlayerScoreCurrent(0);
        setCurrentPlayer(1);

        return;
      }

      setFirstPlayerScoreCurrent((val) => val + rolledDice);

      return;
    }

    if (rolledDice === 1) {
      setSecondPlayerScoreCurrent(0);
      setCurrentPlayer(0);

      return;
    }

    setSecondPlayerScoreCurrent((val) => val + rolledDice);
  };

  const onNewGame = () => {
    setCurrentPlayer(0);
    setFirstPlayerScore(0);
    setFirstPlayerScoreCurrent(0);
    setSecondPlayerScore(0);
    setSecondPlayerScoreCurrent(0);
    setRolledDice(0);
  };

  return (
    <main className="container">
      <div className="game-container">
        <div
          className={`left-container ${
            currentPlayer === 0 ? "current-player-container" : null
          }`}
        >
          <h2 className="player-name">Player 1</h2>
          <p className="player-score">{firstPlayerScore}</p>

          <div className="current-container">
            <p className="current-label">CURRENT</p>
            <p className="current-count">{firstPlayerScoreCurrent}</p>
          </div>
        </div>
        <div
          className={`right-container ${
            currentPlayer === 1 ? "current-player-container" : null
          }`}
        >
          <h2 className="player-name">Player 2</h2>
          <p className="player-score">{secondPlayerScore}</p>

          <div className="current-container">
            <p className="current-label">CURRENT</p>
            <p className="current-count">{secondPlayerScoreCurrent}</p>
          </div>
        </div>

        {rolledDice !== 0 ? (
          <div className="dice">
            {Array.from(Array(rolledDice).keys()).map((_, idx) => {
              return <div key={idx} className="dice-dot"></div>;
            })}
          </div>
        ) : null}

        <button onClick={onNewGame} className="btn-new-game">
          NEW GAME
        </button>
        <button onClick={onRoll} className="btn-roll-dice">
          ROLL DICE
        </button>
        <button onClick={onHold} className="btn-hold">
          HOLD
        </button>
      </div>
    </main>
  );
}

export default App;
