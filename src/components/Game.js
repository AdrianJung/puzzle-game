import React, { useState } from "react";
import { StyledGame, StyledInput, StyledButton } from "./GameBoardStyles";
import GameBoard from "./GameBoard";

const Game = () => {
  const [gameState, setGameState] = useState(0);
  const [colState, setColState] = useState(3);
  const [rowState, setRowState] = useState(3);

  const render = () => {
    const canStart =
      colState >= 3 && colState <= 10 && rowState >= 3 && rowState <= 10;
    switch (gameState) {
      case 0:
        return (
          <>
            <h3>Kolumner & Rader måste vara mellan 3 - 10</h3>
            <br />
            <div>
              <label htmlFor="row">Antal Rader</label>
              <StyledInput
                id="row"
                value={rowState}
                type="number"
                onChange={(e) => setRowState(e.target.value)}
              ></StyledInput>
            </div>
            <div>
              <label htmlFor="col">Antal Kolumner</label>
              <StyledInput
                id="col"
                value={colState}
                type="number"
                onChange={(e) => setColState(e.target.value)}
              ></StyledInput>
            </div>
            <br />
            <StyledButton
              disabled={!canStart}
              onClick={() => canStart && setGameState(1)}
            >
              Start
            </StyledButton>
          </>
        );
      case 1:
        return (
          <GameBoard
            setGameState={setGameState}
            rows={rowState}
            cols={colState}
          />
        );
      case 2:
        return <h1>Grattis, du klarade spelet</h1>;
    }
  };

  return <StyledGame>{render()}</StyledGame>;
};

export default Game;
