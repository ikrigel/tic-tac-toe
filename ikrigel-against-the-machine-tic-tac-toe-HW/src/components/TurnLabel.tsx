import React from 'react';
import { useRecoilValue } from 'recoil';
import { isPlayersTurn } from '../store';

interface Props {}

const TurnLabel: React.FC<Props> = () => {
  const is_players_turn = useRecoilValue(isPlayersTurn);
  return (
    <div id='turn-label'>
      {is_players_turn ? 'תורך' : "Opponent's turn"}
    </div>
  );
};

export default TurnLabel;
