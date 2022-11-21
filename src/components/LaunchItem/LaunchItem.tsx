import React from 'react';
import { Launch } from '../../types/launch';

interface Props {
  launch: Launch;
}

export const LaunchItem: React.FC<Props> = ({ launch }) => {
  return (
    <li>
      {launch.id}
    </li>
  );
};
