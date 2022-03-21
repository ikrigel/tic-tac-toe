import { selector } from 'recoil';
import { checkWin } from '../helpers';
import { board } from './atoms';

export const isBoardFull = selector({
  key: 'isBoardFull',
  get: ({ get }) => {
    const current_board = get(board);
    for (let index = 0; index < current_board.length; index++) {
      if (!current_board[index]) {
        return false;
      }
    }
    return true;
  },
});

export const isGameWon = selector({
  key: 'isGameWon',
  get: ({ get }) => {
    const current_board = get(board);

    return checkWin(current_board);
  },
});
