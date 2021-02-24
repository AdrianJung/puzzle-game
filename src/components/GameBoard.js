import React, { useEffect, useState } from "react";
import { StyledGameBoard, StyledTile, StyledButton } from "./GameBoardStyles";

/* Chunk Function from https://youmightnotneed.com/lodash */
const chunk = (arr, chunkSize = 1, cache = []) => {
  const tmp = [...arr];
  if (chunkSize <= 0) return cache;
  while (tmp.length) cache.push(tmp.splice(0, chunkSize));
  return cache;
};

/* Function to Generate Board */
const generate = (cols, rows) => {
  return chunk(
    [...Array(cols * rows).keys()].sort(() => {
      return Math.floor(Math.random() - 0.5);
    }),
    cols
  );
};
const generateEasy = (cols, rows) => {
  let solution = [...Array(cols * rows).keys()].map((val, key, src) => {
    if (key === src.length - 1) {
      return 0;
    }
    return val + 1;
  });

  let temp = solution[solution.length - 1];
  solution[solution.length - 1] = solution[solution.length - 2];
  solution[solution.length - 2] = temp;

  return chunk(solution, cols);
};

/* Function to check if numbers on board are in correct order */
const checkBoardState = (boardState, cols, rows) => {
  const arr = [...boardState.flat()];

  const solution = [...Array(cols * rows).keys()].map((val, key, src) => {
    if (key === src.length - 1) {
      return 0;
    }
    return val + 1;
  });

  return JSON.stringify(arr) === JSON.stringify(solution);
};

/* Function to check available tiles */
const checkTile = (boardState, setBoardState, x, y, rows, cols) => {
  let newBoardState = [...boardState];
  let current = { x, y };
  let target = null;
  let direction = null;

  for (let a = 0; a < cols; a++) {
    for (let b = 0; b < rows; b++) {
      if (boardState[a][b] === 0) {
        target = { x: a, y: b };
        if (target.x === current.x) {
          direction = target.y > current.y ? "right" : "left";
        } else {
          direction = target.x > current.x ? "down" : "up";
        }
      }
    }
  }

  if (!target || (target.x !== current.x && target.y !== current.y)) {
    return;
  }

  switch (direction) {
    case "up":
      for (let k = target.x; k <= current.x; k++) {
        if (k - 1 >= target.x) {
          newBoardState[k - 1][current.y] = boardState[k][current.y];
        }
      }
      break;

    case "down":
      for (let k = target.x; k >= current.x; k--) {
        if (k + 1 <= target.x) {
          newBoardState[k + 1][current.y] = boardState[k][current.y];
        }
      }
      break;

    case "right":
      for (let k = target.y; k >= current.y; k--) {
        if (k + 1 <= target.y) {
          newBoardState[current.x][k + 1] = boardState[current.x][k];
        }
      }
      break;

    case "left":
      for (let k = target.y; k <= current.y; k++) {
        if (k - 1 >= target.y) {
          newBoardState[current.x][k - 1] = boardState[current.x][k];
        }
      }
      break;
  }

  newBoardState[current.x][current.y] = 0;
  return setBoardState(newBoardState);
};

const GameBoard = ({ setGameState, cols, rows }) => {
  const [boardState, setBoardState] = useState([]);

  useEffect(() => {
    setBoardState(generate(cols, rows));
  }, []);

  useEffect(() => {
    if (boardState.length > 0 && checkBoardState(boardState, cols, rows)) {
      setGameState(2);
    }
  }, [boardState]);
  return (
    <>
      <StyledGameBoard cols={cols} rows={rows}>
        {boardState &&
          boardState.map((row, i) => {
            return row.map((item, j) => {
              return (
                <StyledTile
                  onClick={() =>
                    checkTile(boardState, setBoardState, i, j, cols, rows)
                  }
                  key={item}
                  empty={item === 0}
                >
                  {item}
                </StyledTile>
              );
            });
          })}
      </StyledGameBoard>
      <StyledButton
        onClick={() => setBoardState(generate(cols, rows))}
        margintop={true}
      >
        Slumpa
      </StyledButton>
      <StyledButton
        onClick={() => setBoardState(generateEasy(cols, rows))}
        margintop={true}
      >
        Fusk
      </StyledButton>
    </>
  );
};

export default GameBoard;
