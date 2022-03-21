import React from 'react';
import { useRecoilValue } from 'recoil';
import { board } from '../store';
import Tile from './Tile';

interface Props {
  updateBoard: (i: number) => void;
}

const Game: React.FC<Props> = ({ updateBoard }) => {
  const gameboard = useRecoilValue(board);

  const handleClick = (index: number) => {
    updateBoard(index);
  };

  return (
    <div id='board' className='Board'>
      {gameboard.map((item, index) => (
        <Tile key={index} item={item} clicked={handleClick} index={index} />
      ))}
    </div>
  );
};

export default Game;
