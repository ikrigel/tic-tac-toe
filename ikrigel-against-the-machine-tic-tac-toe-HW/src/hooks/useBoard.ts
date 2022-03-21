import { useEffect, useCallback } from 'react';
import { useResetRecoilState } from 'recoil';
import { useRecoilState, useRecoilValue } from 'recoil';
import { calculateNextMove } from '../helpers';
import { board, isPlayersTurn, isGameWon } from '../store';
import { isBoardFull } from '../store/selectors';
import yPic from "../Assets/Images/yPic.png";
import xPic from "../Assets/Images/xPic.png";

const useBoard = () => {
  const [gameboard, setBoard] = useRecoilState(board);
  const [is_players_turn, setIsPlayersTurn] = useRecoilState(isPlayersTurn);
  const is_board_full = useRecoilValue(isBoardFull);
  const is_game_won = useRecoilValue(isGameWon);
  const resetBoard = useResetRecoilState(board);

  const resetGame = () => {
    resetBoard();
    setIsPlayersTurn(true);
  };

  const updateBoard = useCallback(
    (clicked_index: number) => {
      if (gameboard[clicked_index] || is_board_full || is_game_won) {
        return null;
      }

      let new_state: (null | string)[] = [];
      //  new_state[1] = yPic;
      // let X = { yPic };

      setBoard((board) => {
        new_state = [...board];
        new_state[clicked_index] = is_players_turn ? "X" : "O";
        return new_state;
      });

      setIsPlayersTurn((value) => !value);
    },
    [
      gameboard,
      is_board_full,
      is_game_won,
      is_players_turn,
      setBoard,
      setIsPlayersTurn,
    ]
  );

  useEffect(() => {
    if (!is_players_turn) {
      calculateNextMove(gameboard, is_players_turn).then((to_click) =>
        updateBoard(to_click)
      );
    }
  }, [is_players_turn, gameboard, updateBoard]);

  return { updateBoard, resetGame };
};

export default useBoard;
