import { useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  const [board, setBoard] = useState([
    [1, 2, 3, 4, 5, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  const [turnColor, setTurnColor] = useState(3);
  const [white_point, setWhitePoint] = useState(0);
  const [black_point, setBlackPoint] = useState(0);
  const [winner, setWinner] = useState<string | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [observed, setObserved] = useState(false);

  const clickCell = (x: number, y: number) => {
    const newBoard = structuredClone(board);
    if (newBoard[y][x] === 0) {
      newBoard[y][x] = turnColor;
      setBoard(newBoard);
      setTurnColor(turnColor === 3 ? 6 : turnColor === 4 ? 5 : turnColor === 5 ? 3 : 4);
    }
  };

  const checkCompleted = (line: number[]) => {
    let countBlack = 0;
    let countWhite = 0;
    for (let i = 0; i < line.length; i++) {
      if (line[i] === 1) {
        countBlack++;
        countWhite = 0;
      } else if (line[i] === 2) {
        countWhite++;
        countBlack = 0;
      } else {
        countBlack = 0;
        countWhite = 0;
      }
      if (countBlack === 5) {
        return 'black';
      }
      if (countWhite === 5) {
        return 'white';
      }
    }
    return 'none';
  };

  const observeBoard = () => {
    if (!observed) {
      const observedBoard = board.map((row) =>
        row.map((cell) => {
          if (cell === 3) {
            return Math.random() < 0.9 ? 1 : 2;
          }
          if (cell === 4) {
            return Math.random() < 0.7 ? 1 : 2;
          }
          if (cell === 5) {
            return Math.random() < 0.7 ? 2 : 1;
          }
          if (cell === 6) {
            return Math.random() < 0.9 ? 2 : 1;
          }
          return cell;
        }),
      );

      // 横方向のラインが揃っているかチェック
      for (let i = 0; i < 15; i++) {
        const line = observedBoard[i];
        const winner = checkCompleted(line);
        if (winner === 'black') {
          setBlackPoint((prev) => prev + 1);
        } else if (winner === 'white') {
          setWhitePoint((prev) => prev + 1);
        }
      }

      // 縦方向のラインが揃っているかチェック
      for (let j = 0; j < 15; j++) {
        const column = [];
        for (let i = 0; i < 15; i++) {
          column.push(observedBoard[i][j]);
        }
        const winner = checkCompleted(column);
        if (winner === 'black') {
          setBlackPoint((prev) => prev + 1);
        } else if (winner === 'white') {
          setWhitePoint((prev) => prev + 1);
        }
      }

      // 右斜め方向のラインが揃っているかチェック
      for (let i = 0; i <= 10; i++) {
        const diagonal = [];
        for (let j = 0; j < 15 - i; j++) {
          diagonal.push(observedBoard[j][j + i]);
        }
        const winner = checkCompleted(diagonal);
        if (winner === 'black') {
          setBlackPoint((prev) => prev + 1);
        } else if (winner === 'white') {
          setWhitePoint((prev) => prev + 1);
        }
      }
      for (let j = 1; j <= 10; j++) {
        const diagonal = [];
        for (let i = 0; i < 15 - j; i++) {
          diagonal.push(observedBoard[i + j][i]);
        }
        const winner = checkCompleted(diagonal);
        if (winner === 'black') {
          setBlackPoint((prev) => prev + 1);
        } else if (winner === 'white') {
          setWhitePoint((prev) => prev + 1);
        }
      }

      // 左斜め方向のラインが揃っているかチェック
      for (let i = 0; i <= 10; i++) {
        const diagonal = [];
        for (let j = 0; j < 15 - i; j++) {
          diagonal.push(observedBoard[j][14 - (j + i)]);
        }
        const winner = checkCompleted(diagonal);
        if (winner === 'black') {
          setBlackPoint((prev) => prev + 1);
        } else if (winner === 'white') {
          setWhitePoint((prev) => prev + 1);
        }
      }
      for (let j = 1; j <= 10; j++) {
        const diagonal = [];
        for (let i = 0; i < 15 - j; i++) {
          diagonal.push(observedBoard[i + j][14 - i]);
        }
        const winner = checkCompleted(diagonal);
        if (winner === 'black') {
          setBlackPoint((prev) => prev + 1);
        } else if (winner === 'white') {
          setWhitePoint((prev) => prev + 1);
        }
      }
      setObserved(true);
    } else {
      const pointDifference = Math.abs(white_point - black_point);
      if (pointDifference >= 1) {
        setWinner(white_point > black_point ? 'White' : 'Black');
        setGameOver(true); // 勝敗が確定した場合、ゲームオーバーに設定する
      } else {
        setObserved(false);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.board}>
        {board.map((row, y) =>
          row.map((color, x) => (
            <div className={styles.cell} key={`${x}-${y}`} onClick={() => clickCell(x, y)}>
              {color !== 0 && (
                <div
                  className={styles.stone}
                  style={{
                    backgroundColor:
                      color === 1
                        ? '#000000'
                        : color === 2
                          ? '#ffffff'
                          : color === 3
                            ? '#333333'
                            : color === 4
                              ? '#4d4d4d'
                              : color === 5
                                ? '#b3b3b3'
                                : '#e6e6e6',
                  }}
                />
              )}
            </div>
          )),
        )}
      </div>
      {!gameOver && <button onClick={observeBoard}>観測</button>}
      <div>{winner !== null && `Winner: ${winner}`}</div>
      <div>
        White Point: {white_point} ｜ Black Point: {black_point}
      </div>
    </div>
  );
};

export default Home;
