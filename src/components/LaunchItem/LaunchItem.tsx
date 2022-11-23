import React from 'react';
import { Launch } from '../../types/launch';

interface Props {
  launch: Launch;
}

export const LaunchItem: React.FC<Props> = ({ launch }) => {
  const {
    name,
    links,
    date_utc,
    success,
    details,
  } = launch;
  // const [rocketInfo, setRocketInfo] = useState<any>(null);
  const image = links.patch.small || 'https://media.istockphoto.com/id/1264696423/vector/rocket-vector-icon.jpg?b=1&s=612x612&w=0&k=20&c=_FUB5KQBiHfqfEw00eGzxj7r1PHQ2jXai_NyrtLbv08=';

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
        src={image}
        alt={name}
        className={'launch__image'}
      />

      <h3 className='launch__title'>
        {name}
      </h3>

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
