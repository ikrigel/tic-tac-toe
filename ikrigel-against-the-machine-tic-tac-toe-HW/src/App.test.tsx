import { render } from '@testing-library/react';
import React from 'react';
import { snapshot_UNSTABLE, RecoilRoot } from 'recoil';
import App from './App';
import { board, isBoardFull, isGameWon, isPlayersTurn } from './store';

const EMPTY_BOARD: (string | null)[] = Array(9).fill(null);

beforeEach(() => {
  render(
    <React.StrictMode>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </React.StrictMode>
  );
});

it('renders the app correctly', () => {
  expect(document.getElementById('app')).not.toBeNull();
  expect(document.getElementById('turn-label')).not.toBeNull();
  expect(document.getElementById('board')).not.toBeNull();
});

it('initial game state is correct', () => {
  const initialSnapshot = snapshot_UNSTABLE();
  expect(initialSnapshot.getLoadable(board).valueOrThrow()).toEqual(
    EMPTY_BOARD
  );
  expect(initialSnapshot.getLoadable(isBoardFull).valueOrThrow()).toBe(false);
  expect(initialSnapshot.getLoadable(isGameWon).valueOrThrow()).toBe(false);
  expect(initialSnapshot.getLoadable(isPlayersTurn).valueOrThrow()).toBe(true);
});
