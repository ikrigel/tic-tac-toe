export const checkWin = (board: (null | string)[]) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return true;
    }
  }
  return false;
};

export const checkFull = (board: (null | string)[]) => {
  for (let i = 0; i < board.length; i++) {
    if (!board[i]) {
      return false;
    }
  }
  return true;
};

export const findWinningIndex = (
  board: (null | string)[],
  mark: string
): number | null => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let chances: number[] = [];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    if (
      !(
        (board[a] && board[b]) ||
        (board[a] && board[c]) ||
        (board[b] && board[c])
      )
    ) {
      continue;
    }

    if (board[a] === board[b] && !board[c]) {
      if (board[a] === mark) {
        return c;
      } else {
        chances.push(c);
      }
    } else if (board[a] === board[c] && !board[b]) {
      if (board[a] === mark) {
        return b;
      } else {
        chances.push(b);
      }
    } else if (board[b] === board[c] && !board[a]) {
      if (board[b] === mark) {
        return a;
      } else {
        chances.push(a);
      }
    }
  }

  return chances[0] ?? null;
};

export const findDoubleWinThreat = (
  board: (null | string)[]
): number | null => {
  const corners = [0, 2, 6, 8];
  // Alotus
  if (
    board[4] &&
    !board[0] &&
    !board[1] &&
    !board[2] &&
    !board[3] &&
    !board[5] &&
    !board[6] &&
    !board[7] &&
    !board[8]
  )
    return corners[Math.floor(Math.random() * 4)];
  // Vastakkaiset nurkat
  else if (
    board[2] &&
    board[4] &&
    board[6] &&
    board[2] === board[6] &&
    board[2] !== board[4] &&
    !board[0] &&
    !board[8] &&
    !board[5] &&
    !board[3] &&
    !board[1] &&
    !board[7]
  )
    return 5;
  else if (
    board[0] &&
    board[4] &&
    board[8] &&
    board[0] === board[8] &&
    board[0] !== board[4] &&
    !board[2] &&
    !board[6] &&
    !board[5] &&
    !board[3] &&
    !board[1] &&
    !board[7]
  )
    return 5;
  else if (board[0] && board[0] === board[8] && !board[6] && !board[2])
    return 2;
  else if (board[2] && board[2] === board[6] && !board[0] && !board[8])
    return 8;
  // Diagonaalit
  else if (board[0] && board[0] === board[4] && !board[8]) return 8;
  else if (board[2] && board[2] === board[4] && !board[6]) return 6;
  else if (board[8] && board[8] === board[4] && !board[0]) return 0;
  else if (board[6] && board[6] === board[4] && !board[2]) return 2;
  // Nurkat
  if (board[1] && board[1] === board[3] && !board[0]) return 0;
  else if (board[1] && board[1] === board[5] && !board[2]) return 2;
  else if (board[3] && board[3] === board[7] && !board[6]) return 6;
  else if (board[5] && board[5] === board[7] && !board[8]) return 8;
  // L-muodot
  else if (board[1] && board[1] === board[6] && !board[0]) return 0;
  else if (board[1] && board[1] === board[8] && !board[2]) return 2;
  else if (board[3] && board[3] === board[2] && !board[0]) return 0;
  else if (board[3] && board[3] === board[8] && !board[6]) return 6;
  else if (board[5] && board[5] === board[0] && !board[2]) return 2;
  else if (board[5] && board[5] === board[6] && !board[8]) return 8;
  else if (board[7] && board[7] === board[0] && !board[6]) return 6;
  else if (board[7] && board[7] === board[2] && !board[8]) return 8;
  // Ei vaaraa
  else return null;
};

export const calculateNextMove = async (
  board: (null | string)[],
  is_players_turn: boolean
) => {
  if (checkFull(board)) {
    return 0;
  }

  if (!board[4]) {
    return 4;
  }

  let mark = is_players_turn ? 'X' : 'O';

  let winning_index = await findWinningIndex(board, mark);
  let double_threat_index = await findDoubleWinThreat(board);

  if (winning_index) return winning_index;
  else if (double_threat_index && !winning_index && winning_index !== 0)
    return double_threat_index;
  else if (
    !winning_index &&
    winning_index !== 0 &&
    !double_threat_index &&
    double_threat_index !== 0
  ) {
    let index: number = 4;

    while (board[index]) {
      index = Math.floor(Math.random() * 9);
    }

    return index;
  } else {
    return 0;
  }
};
