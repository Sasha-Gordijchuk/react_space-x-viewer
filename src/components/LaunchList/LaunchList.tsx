import React from 'react';
import { Launch } from '../../types/launch';
import { LaunchItem } from '../LaunchItem';

interface Props {
  launches: Launch[];
}

export const LaunchList: React.FC<Props> = ({ launches }) => {
  const visibleLaunches = launches.slice(0, 20);

  return (
    <ul className='catalog__list'>
      {visibleLaunches.map(launch => {
        return (
          <LaunchItem 
            key={launch.id}
            launch={launch}
          />
        );
      })}
    </ul>
  );
};
