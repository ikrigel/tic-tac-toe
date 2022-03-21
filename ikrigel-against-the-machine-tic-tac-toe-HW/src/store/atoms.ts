import { atom } from 'recoil';

export const board = atom<(null | string)[]>({
  key: 'board',
  default: [null, null, null, null, null, null, null, null, null],
});

export const isPlayersTurn = atom<boolean>({
  key: 'isPlayersTurn',
  default: true,
});
