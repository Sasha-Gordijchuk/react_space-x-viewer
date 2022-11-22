import React, { useEffect, useState } from 'react';
import { getRocket } from '../../api/launches';
import { Launch } from '../../types/launch';

interface Props {
  launch: Launch;
}

export const LaunchItem: React.FC<Props> = ({ launch }) => {
  const {
    name,
    links,
    // rocket,
    date_utc,
    success,
    details,
  } = launch;
  const [rocketInfo, setRocketInfo] = useState<any>(null);

  // useEffect(() => {
  //   if (rocket) {
  //     getRocket(rocket)
  //       .then(res => {
  //         setRocketInfo(res.data);
  //       });
  //   }
  // }, [rocket]);

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

      {/* <div className='launch__info'>
        <p className='launch__info-title'>Rocket</p>
        <p className='launch__info-value'>
          {rocketInfo
            ? rocketInfo.name
            : 'No info'
          }
        </p>
      </div> */}

      <div className='launch__info'>
        <p className='launch__info-title'>Date</p>
        <p className='launch__info-value'>
          {date_utc
            ? date_utc.slice(0, 10)
            : 'No info'
          }
        </p>
      </div>

      <div className='launch__info'>
        <p className='launch__info-title'>Time</p>
        <p className='launch__info-value'>
          {date_utc
            ? date_utc.slice(12, 19)
            : 'No info'
          }
        </p>
      </div>

      <div className='launch__info'>
        <p className='launch__info-title'>Success</p>
        <p className='launch__info-value'>
          {success
            ? 'Yes'
            : 'No'
          }
        </p>
      </div>

      <p className='launch__description'>
        {details}
      </p>
    </li>
  );
};
