import React from 'react';
import { Launch } from '../../types/launch';
import { LaunchItem } from '../LaunchItem';


interface Props {
  launches: Launch[];
  setSelectedLaunch: (launch: Launch) => void;
}

export const LaunchList: React.FC<Props> = ({ 
  launches,
  setSelectedLaunch,
}) => {
  return (
    <ul className='catalog__list'>
      {launches.map(launch => {
        return (
          <LaunchItem 
            key={launch.id}
            launch={launch}
            setSelectedLaunch={setSelectedLaunch}
          />
        );
      })}      
    </ul>
  );
};
