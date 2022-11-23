import React from 'react';
import { Launch } from '../../types/launch';
import { LaunchItem } from '../LaunchItem';


interface Props {
  launches: Launch[];
}

export const LaunchList: React.FC<Props> = ({ launches }) => {
  return (
    <ul className='catalog__list'>
      {launches.map(launch => {
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
