import React from 'react';
import { Launch } from '../../types/launch';

interface Props {
  launch: Launch;
}

export const LaunchItem: React.FC<Props> = ({ launch }) => {
  const {
    name,
    links,
  } = launch;

  return (
    <li className='catalog__item launch'>
      <img 
        src={links.patch.small} 
        alt={name}
        className='launch__image'
      />

      <h3 className='launch__title'>
        {name}
      </h3>
    </li>
  );
};
