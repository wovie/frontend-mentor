'use client';

import { Outfit } from 'next/font/google';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const outfit = Outfit({
  subsets: ['latin'],
});

const base = '/tic-tac-toe';

const outlineX = (
  <svg
    className='text-cyan-500 h-8 w-8'
    viewBox='0 0 64 64'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M51.12 1.269c.511 0 1.023.195 1.414.586l9.611 9.611c.391.391.586.903.586 1.415s-.195 1.023-.586 1.414L44.441 32l17.704 17.705c.391.39.586.902.586 1.414 0 .512-.195 1.024-.586 1.415l-9.611 9.611c-.391.391-.903.586-1.415.586a1.994 1.994 0 0 1-1.414-.586L32 44.441 14.295 62.145c-.39.391-.902.586-1.414.586a1.994 1.994 0 0 1-1.415-.586l-9.611-9.611a1.994 1.994 0 0 1-.586-1.415c0-.512.195-1.023.586-1.414L19.559 32 1.855 14.295a1.994 1.994 0 0 1-.586-1.414c0-.512.195-1.024.586-1.415l9.611-9.611c.391-.391.903-.586 1.415-.586s1.023.195 1.414.586L32 19.559 49.705 1.855c.39-.391.902-.586 1.414-.586Z'
      stroke='#31C3BD'
      strokeWidth='2'
      fill='currentColor'
    />
  </svg>
);

const outlineO = (
  <svg
    className='text-amber-400 h-8 w-8'
    viewBox='0 0 66 66'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M33 1c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C15.327 65 1 50.673 1 33 1 15.327 15.327 1 33 1Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z'
      stroke='#F2B137'
      strokeWidth='2'
      fill='currentColor'
    />
  </svg>
);

const iconX = (
  <Image src={`${base}/icon-x.svg`} alt='X' width={64} height={64} />
);

const iconO = (
  <Image src={`${base}/icon-o.svg`} alt='O' width={64} height={64} />
);

const logo = (
  <Image src={`${base}/logo.svg`} alt='Logo' width={72} height={32} />
);

export default function Home() {
  const [playerMark, setPlayerMark] = useState('X');
  const [boardValues, setBoardValues] = useState([
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ]);
  const [showGameBoard, setShowGameBoard] = useState(false);
  const [currentTurn, setCurrentTurn] = useState('X');
  const [score, setScore] = useState({ player: 0, ties: 0, ai: 0 });
  const [showModal, setShowModal] = useState(''); // WIN, LOSE, TIE, RESTART

  useEffect(() => {
    if (
      currentTurn !== playerMark &&
      !showModal &&
      boardValues.some((value) => value === '') &&
      showGameBoard
    ) {
      const empty = boardValues
        .map((value, idx) => (value === '' ? idx : null))
        .filter((idx) => idx !== null);

      const rand = Math.floor(Math.random() * empty.length);

      const timeout = setTimeout(() => {
        handleBoardClick(empty[rand]);
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [currentTurn, showModal, boardValues, playerMark]);

  const newGameMenu = (
    <div className='flex flex-col gap-8 justify-center items-center w-[340px] md:w-[460px]'>
      {logo}
      <div className='w-full p-4 bg-slate-900 rounded-xl text-slate-300 text-center shadow-2xl'>
        <div className='font-semibold'>PICK YOUR MARK</div>
        <div className='p-2 rounded-xl bg-slate-800 flex justify-center mt-4'>
          {[
            { mark: 'X', svg: outlineX },
            { mark: 'O', svg: outlineO },
          ].map((mark) => (
            <button
              key={mark.mark}
              type='button'
              className={
                `grid place-items-center w-full h-14 rounded-xl cursor-pointer ` +
                (playerMark === mark.mark ? 'bg-slate-500' : '')
              }
              onClick={() => setPlayerMark(mark.mark)}
            >
              {mark.svg}
            </button>
          ))}
        </div>
        <p className='text-xs mt-4'>REMEMBER : X GOES FIRST</p>
      </div>
      <button
        type='button'
        className='w-full rounded-lg text-gray-800 bg-amber-300 cursor-pointer p-2 font-semibold shadow-lg'
        onClick={() => createNewGame()}
      >
        NEW GAME (VS AI)
      </button>
    </div>
  );

  const createNewGame = () => {
    resetGame();
    setScore({ player: 0, ties: 0, ai: 0 });
    setShowGameBoard(true);
  };

  const resetGame = () => {
    setBoardValues(['', '', '', '', '', '', '', '', '']);
    setCurrentTurn('X');
  };

  const turnIcon = (
    <div className='relative w-4 h-4 mr-2'>
      <Image
        src={`${base}/icon-${currentTurn === 'X' ? 'x' : 'o'}.svg`}
        alt={currentTurn}
        fill
      />
    </div>
  );

  const handleBoardClick = (idx: number) => {
    if (boardValues[idx] !== '') return;
    const newBoardValues = [...boardValues];
    newBoardValues[idx] = currentTurn;
    setBoardValues(newBoardValues);
    checkWinConditions(newBoardValues);
    setCurrentTurn(currentTurn === 'X' ? 'O' : 'X');
  };

  const gameBoard = (
    <div
      className={
        `w-[340px] md:w-[460px] grid grid-cols-3 gap-2 md:gap-4 place-items-center ` +
        (showModal ? 'pointer-events-none' : '')
      }
    >
      <button
        className='justify-self-start cursor-pointer'
        onClick={() => setShowGameBoard(false)}
      >
        {logo}
      </button>
      <div className='w-full flex items-center justify-center bg-slate-900 rounded-lg p-2 text-slate-300 text-sm font-semibold'>
        {turnIcon} TURN
      </div>
      <button
        className='justify-self-end p-2 bg-slate-300 rounded-lg cursor-pointer shadow-xl'
        onClick={() => setShowModal('RESTART')}
      >
        <Image
          src={`${base}/icon-restart.svg`}
          alt='Restart'
          width={20}
          height={20}
        />
      </button>
      {boardValues.map((boardValue, idx) => (
        <button
          key={idx}
          type='button'
          className='bg-slate-900 rounded-xl w-28 h-28 md:w-36 md:h-36 shadow-lg cursor-pointer grid place-items-center'
          onClick={() => handleBoardClick(idx)}
        >
          {boardValue === 'X' ? iconX : boardValue === 'O' ? iconO : ''}
        </button>
      ))}
      <div
        className={
          `w-full h-16 flex flex-col items-center justify-center rounded-lg ` +
          (playerMark === 'X' ? 'bg-cyan-400' : 'bg-amber-300')
        }
      >
        <div>{playerMark} (YOU)</div>
        <div className='font-bold'>{score.player}</div>
      </div>
      <div className='w-full h-16 flex flex-col items-center justify-center bg-slate-300 rounded-lg'>
        <div>TIES</div>
        <div className='font-bold'>{score.ties}</div>
      </div>
      <div
        className={
          `w-full h-16 flex flex-col items-center justify-center rounded-lg ` +
          (playerMark === 'X' ? 'bg-amber-300' : 'bg-cyan-400')
        }
      >
        <div>{playerMark === 'X' ? 'O' : 'X'} (AI)</div>
        <div className='font-bold'>{score.ai}</div>
      </div>
    </div>
  );

  const checkWinConditions = (values: string[]) => {
    const WIN_COMBINATIONS = [
      [0, 1, 2], // rows
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6], // columns
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8], // diagonals
      [2, 4, 6],
    ];

    for (const combo of WIN_COMBINATIONS) {
      const [a, b, c] = combo;
      if (values[a] && values[a] === values[b] && values[a] === values[c]) {
        if (values[a] === playerMark) {
          setShowModal('WIN');

          setScore((prev) => ({
            ...prev,
            player: prev.player + 1,
          }));
        } else {
          setShowModal('LOSE');

          setScore((prev) => ({
            ...prev,
            ai: prev.ai + 1,
          }));
        }
        return;
      }
    }

    // handle ties
    if (values.every((value) => value !== '')) {
      setScore((prev) => ({
        ...prev,
        ties: prev.ties + 1,
      }));
      setShowModal('TIE');
    }
  };

  const modal = (type: string) => (
    <div className='absolute min-w-full h-[266px] bg-slate-700'>
      {type !== 'RESTART' && (
        <div className='grid place-items-center h-full py-8'>
          {type !== 'TIE' && (
            <div className='text-slate-300 font-semibold text-sm'>
              {type === 'LOSE' ? `OH NO, YOU LOST...` : `YOU WON!`}
            </div>
          )}
          {type !== 'TIE' && (
            <div className='flex items-center'>
              {currentTurn === 'X' ? iconO : iconX}
              <span
                className={
                  `ml-4 font-semibold text-2xl ` +
                  (currentTurn === 'X' ? 'text-amber-300' : 'text-slate-300')
                }
              >
                TAKES THE ROUND
              </span>
            </div>
          )}
          {type === 'TIE' && (
            <div className='font-semibold text-2xl text-slate-300'>
              ROUND TIED
            </div>
          )}
          <div>
            <button
              className='bg-slate-200 rounded-lg cursor-pointer py-2 px-4 font-semibold mr-4 shadow-lg'
              onClick={() => {
                setShowGameBoard(false);
                setShowModal('');
              }}
            >
              QUIT
            </button>
            <button
              className='bg-amber-300 rounded-lg cursor-pointer py-2 px-4 font-semibold shadow-lg'
              onClick={() => {
                setShowModal('');
                setShowGameBoard(true);
                resetGame();
              }}
            >
              NEXT ROUND
            </button>
          </div>
        </div>
      )}
      {type === 'RESTART' && (
        <div className='grid place-items-center h-full py-8'>
          <div className='font-semibold text-2xl text-slate-300'>
            RESTART GAME?
          </div>
          <div>
            <button
              className='bg-slate-200 rounded-lg cursor-pointer py-2 px-4 font-semibold mr-4 shadow-lg'
              onClick={() => setShowModal('')}
            >
              NO, CANCEL
            </button>
            <button
              className='bg-amber-300 rounded-lg cursor-pointer py-2 px-4 font-semibold shadow-lg'
              onClick={() => {
                setShowModal('');
                setShowGameBoard(true);
                resetGame();
              }}
            >
              YES, RESTART
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <main
      className={`${outfit.className} min-h-screen bg-slate-800 p-4 grid place-items-center`}
    >
      {!showGameBoard && newGameMenu}
      {showGameBoard && gameBoard}
      {showModal && modal(showModal)}
    </main>
  );
}
