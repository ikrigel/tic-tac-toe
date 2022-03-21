import React from 'react';
import { useRecoilValue } from 'recoil';

import Game from './components/Game';
import NewGame from './components/NewGame';
import TurnLabel from './components/TurnLabel';
import { isBoardFull, isGameWon } from './store';
import useBoard from './hooks/useBoard';

import './App.css';

interface Props {}

const App: React.FC<Props> = () => {
  const is_game_won = useRecoilValue(isGameWon);
  const is_board_full = useRecoilValue(isBoardFull);
  const { resetGame, updateBoard } = useBoard();
  return (

    <div id='app' className='App'>
      <h1>!!! אסף הוא המרצה הכי טוב בעולם</h1>
      <h1>משחק איקס-עיגול</h1>
      <h3>אתגר והנאה לכל המשפחה</h3>
      <Game updateBoard={updateBoard} />
      {is_game_won || is_board_full ? (
        <NewGame resetGame={resetGame} />
      ) : (
        <TurnLabel />
      )}

      <h6>© כל הזכויות שמורות </h6>
      
    </div>
  );
};

export default App;
