import React, { useEffect, useState } from 'react';
import { getRocket } from '../../api/launches';
import { Launch } from '../../types/launch';

interface Props {
  launch: Launch;
  setSelectedLaunch: (launch: Launch) => void;
}

export const LaunchItem: React.FC<Props> = ({ 
  launch,
  setSelectedLaunch,
}) => {
  const {
    name,
    links,
    date_utc,
    success,
    rocket,
  } = launch;
  const [rocketInfo, setRocketInfo] = useState<any>();
  const image = links.patch.small || 'https://media.istockphoto.com/id/1264696423/vector/rocket-vector-icon.jpg?b=1&s=612x612&w=0&k=20&c=_FUB5KQBiHfqfEw00eGzxj7r1PHQ2jXai_NyrtLbv08=';

  const loadRocket = async (rocketId: string) => {
    const response = await getRocket(rocketId);

    setRocketInfo(response.data);
  };

  useEffect(() => {
    if (rocket) {
      loadRocket(rocket);
    }
  }, [rocket]);  

  return (
    <li 
      className='catalog__item launch'
      onClick={() => setSelectedLaunch(launch)}
    >
      <img 
        src={image}
        alt={name}
        className={'launch__image'}
      />

      <h3 className='launch__title'>
        {name}
      </h3>

      <div className='launch__info'>
        <p className='launch__info-title'>Rocket</p>
        <p className='launch__info-value'>
          {rocketInfo 
            ? rocketInfo.name
            : 'No info'
          }
        </p>
      </div>

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
    </li>
  );
};
