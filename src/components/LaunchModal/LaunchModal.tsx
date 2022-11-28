import { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { getCrewMember, getLaunchpad } from '../../api/launches';
import { Launch } from '../../types/launch';

interface Props {
  launch: Launch;
  rocket: any;
  setSelectedLaunch: (val: null) => void
}

export const LaunchModal: React.FC<Props> = ({
  launch,
  rocket,
  setSelectedLaunch,
}) => {
  const {
    name,
    links,
    details,
    date_utc,
  } = launch;
  const [launchpad, setLaunchpad] = useState<any>(null);

  const loadLaunchpad = async (id: string) => {
    const response = await getLaunchpad(id);

    setLaunchpad(response.data);
  };

  useEffect(() => {
    if (launch.launchpad) {
      loadLaunchpad(launch.launchpad);
    }
  }, [launch.launchpad]);
  
  return (
    <div 
      className='modal is-active'
    >
      <div 
        className='modal-background'
        onClick={() => setSelectedLaunch(null)}
      />

      <div className='modal-card'>
        <header className='modal-card-head'>
          <p className='modal-card-title'>Launch Info</p>

          <button
            type='button'
            className='delete'
            onClick={() => setSelectedLaunch(null)}
          />
        </header>
        <section className='modal-card-body'>
          <div className='content is-medium'>
            <h2 className='block'>{name}</h2>
            <iframe 
              title='video'
              className='block'
              src={`https://www.youtube.com/embed/${links.youtube_id}`}
              frameBorder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              width={600}
              height={340}
            />

            {details && (
              <p className='block'>{details}</p>
            )}

            {rocket && (
              <div className='info'>
                <p className='info__title'>Rocket</p>
                <p className='info__value'>{rocket.name}</p>
              </div>
            )}

            {date_utc && (
              <>
                <div className='info'>
                  <p className='info__title'>Date</p>
                  <p className='info__value'>{date_utc.slice(0, 10)}</p>
                </div>
              
                <div className='info'>
                  <p className='info__title'>Time</p>
                  <p className='info__value'>{date_utc.slice(12, 19)}</p>
                </div>
              </>
            )}

            {launchpad && (
              <>
                <div className='info'>
                  <p className='info__title'>Launchpad</p>
                  <p className='info__value'>{launchpad.full_name}</p>
                </div>

                <div className='info'>
                  <p className='info__title'>Location</p>
                  <p className='info__value'>{launchpad.region}</p>
                </div>
              </>
            )}
          </div>

        </section>
      </div>
    </div>
  );
};
