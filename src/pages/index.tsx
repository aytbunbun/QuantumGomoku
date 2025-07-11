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
  const [white_point, setWhitePoint] = useState(0); // 白の得点
  const [black_point, setBlackPoint] = useState(0); // 黒の得点
  const [winner, setWinner] = useState<string | null>(null); // 勝者
  const [gameOver, setGameOver] = useState(false);
  const [observedBoard, setObservedBoard] = useState<number[][] | null>(null);
  // 観測されたか

  const displayBoard = observedBoard ?? board;

  const clickCell = (x: number, y: number) => {
    if (gameOver) return;
    const newBoard = structuredClone(board);
    if (newBoard[y][x] === 0) {
      newBoard[y][x] = turnColor;
      setBoard(newBoard);
      setTurnColor(turnColor === 3 ? 6 : turnColor === 4 ? 5 : turnColor === 5 ? 3 : 4);

      // 観測状態リセット（元に戻れるように）
      setObservedBoard(null);
      setWhitePoint(0);
      setBlackPoint(0);
      setWinner(null);
      setGameOver(false);
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
    if (gameOver) return;

    if (!observedBoard) {
      const newObservedBoard = board.map((row) =>
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

      // 得点リセット
      setWhitePoint(0);
      setBlackPoint(0);

      // 横方向チェック
      for (let i = 0; i < 15; i++) {
        const line = newObservedBoard[i];
        const winner = checkCompleted(line);
        if (winner === 'black') {
          setBlackPoint((prev) => prev + 1);
        } else if (winner === 'white') {
          setWhitePoint((prev) => prev + 1);
        }
      }

      // 縦方向チェック
      for (let j = 0; j < 15; j++) {
        const column = [];
        for (let i = 0; i < 15; i++) {
          column.push(newObservedBoard[i][j]);
        }
        const winner = checkCompleted(column);
        if (winner === 'black') {
          setBlackPoint((prev) => prev + 1);
        } else if (winner === 'white') {
          setWhitePoint((prev) => prev + 1);
        }
      }

      // 右斜めチェック
      for (let i = 0; i <= 10; i++) {
        const diagonal = [];
        for (let j = 0; j < 15 - i; j++) {
          diagonal.push(newObservedBoard[j][j + i]);
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
          diagonal.push(newObservedBoard[i + j][i]);
        }
        const winner = checkCompleted(diagonal);
        if (winner === 'black') {
          setBlackPoint((prev) => prev + 1);
        } else if (winner === 'white') {
          setWhitePoint((prev) => prev + 1);
        }
      }

      // 左斜めチェック
      for (let i = 0; i <= 10; i++) {
        const diagonal = [];
        for (let j = 0; j < 15 - i; j++) {
          diagonal.push(newObservedBoard[j][14 - (j + i)]);
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
          diagonal.push(newObservedBoard[i + j][14 - i]);
        }
        const winner = checkCompleted(diagonal);
        if (winner === 'black') {
          setBlackPoint((prev) => prev + 1);
        } else if (winner === 'white') {
          setWhitePoint((prev) => prev + 1);
        }
      }
      // 観測結果をセットして表示切り替え
      setObservedBoard(newObservedBoard);
      // 観測後、ターン交代
      setTurnColor((prev) => (prev === 3 ? 6 : prev === 4 ? 5 : prev === 5 ? 3 : 4));
    } else {
      // 2回目以降の観測で勝敗判定
      const pointDifference = Math.abs(white_point - black_point);
      if (pointDifference >= 1) {
        setWinner(white_point > black_point ? 'White' : 'Black');
        setGameOver(true); // 勝敗が確定した場合、ゲームオーバーに設定する
      } else {
        // 得点差なし → 観測解除して元の状態に戻す
        setObservedBoard(null);
        setWhitePoint(0);
        setBlackPoint(0);
        setWinner(null);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.board}>
        {displayBoard.map((row, y) =>
          row.map((color, x) => (
            <div className={styles.cell} key={`${x}-${y}`} onClick={() => clickCell(x, y)}>
              {color !== 0 && (
                <div
                  className={styles.stone}
                  style={{
                    backgroundColor: [
                      '#000000',
                      '#ffffff',
                      '#333333',
                      '#4d4d4d',
                      '#b3b3b3',
                      '#e6e6e6',
                    ][color - 1],
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
