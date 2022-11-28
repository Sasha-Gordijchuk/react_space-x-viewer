import React, { useEffect, useState } from 'react';

import { Header } from './components/Header';
import { getLaunches, getRockets } from './api/launches';
import { Launch } from './types/launch';
import { LaunchList } from './components/LaunchList';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Loader } from './components/Loader';
import { Filter } from './components/Filter';
import { LaunchModal } from './components/LaunchModal';

import 'bulma/css/bulma.css';

const LIMIT = 8;

export const App: React.FC = () => {
  const [launchesFromServer, setLaunchesFromServer] = useState<Launch[]>([]);
  const [rocketsFromServer, setRocketsFromServer] = useState<any[]>([]);
  const [filtredLaunches, setFiltredLaunches] = useState<Launch[]>([]);
  const [visibleLaunches, setVisibleLaunches] = useState<Launch[]>([]);
  const [launchesCounter, setLaunchesCounter] = useState<number>(LIMIT);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [selectedLaunch, setSelectedLaunch] = useState<Launch | null>(null);
  const [selectedRocket, setSelectedRocket] = useState<any>(null);

  const [filterByRocket, setFilterByRocket] = useState<string>('');
  const [filterByYear, setFilterByYear] = useState<number>(0);
  const [filterBySuccess, setFilterBySuccess] = useState<number>(2);


  const loadLaunches = async () => {
    const response = await getLaunches();

    setLaunchesFromServer(response.data);
  };

  const loadRockets = async () => {
    const response = await getRockets();

    setRocketsFromServer(response.data);
  };

  const filterLaunches = (
    byRocket: string,
    byYear: number,
    bySuccess: number,
  ) => {
    let filtredByRocket: Launch[] = [...launchesFromServer];
    let filtredByYear: Launch[] = [...launchesFromServer];
    let filtredBySuccess:Launch[] = [...launchesFromServer];

    if (byRocket !== '') {
      filtredByRocket = launchesFromServer
        .filter(({ rocket }) => rocket === filterByRocket);
    }

    if (byYear !== 0) {
      filtredByYear = launchesFromServer
        .filter(({ date_utc }) => +date_utc.slice(0, 4) === filterByYear);
    }

    if (bySuccess !== 2) {
      filtredBySuccess = launchesFromServer
        .filter(({ success }) => success === !!filterBySuccess);
    }

    setFiltredLaunches(launchesFromServer
      .filter(launch => (
        filtredByRocket.includes(launch)
        && filtredByYear.includes(launch)
        && filtredBySuccess.includes(launch)
      )));
  };

  useEffect(() => {
    loadLaunches();
    loadRockets();
  }, []);

  useEffect(() => {
    launchesFromServer.sort((
      { date_unix: first },
      { date_unix: second },
    ) => {
      if (first && second) {
        return second - first;
      }
  
      return 0;
    });

    setFiltredLaunches(launchesFromServer);
  }, [launchesFromServer]);
  
  useEffect(() => {
    setVisibleLaunches(filtredLaunches.slice(0, LIMIT));
  }, [filtredLaunches]);

  useEffect(() => {
    if (selectedLaunch) {
      setSelectedRocket(rocketsFromServer
        .find(({ id }) => id === selectedLaunch.rocket));
    } else {
      setSelectedRocket(null);
    }
  }, [selectedLaunch, rocketsFromServer]);

  useEffect(() => {
    filterLaunches(filterByRocket, filterByYear, filterBySuccess);
  }, [filterByRocket, filterByYear, filterBySuccess]);

  const fetchData = () => {
    const newLimit = launchesCounter + LIMIT;
    const launchesToAdd = filtredLaunches.slice(launchesCounter, newLimit);

    if (filtredLaunches.length > visibleLaunches.length) {
      setTimeout(() => {
        setVisibleLaunches([...visibleLaunches].concat(launchesToAdd));
      }, 500);

      setLaunchesCounter(newLimit);
    } else {
      setHasMore(false);
    }
  };
  
  return (
    <div className='app'>
      <Header />

      <Filter 
        rockets={rocketsFromServer}
        setFilterByRockets={setFilterByRocket}
        setFilterByYear={setFilterByYear}
        setFilterBySuccess={setFilterBySuccess}
      />

      <main className='catalog'>
        <InfiniteScroll
          dataLength={visibleLaunches.length}
          next={fetchData}
          hasMore={hasMore}
          loader={<Loader />}
          style={{
            display: 'flex',
            flexFlow: 'column',
            alignItems: 'center',
            gap: '32px',
            overflow: 'visible',
          }}
        >
          <LaunchList
            launches={visibleLaunches}
            setSelectedLaunch={setSelectedLaunch}
          />
        </InfiniteScroll>
      </main>

      {selectedLaunch
        && (
          <LaunchModal
            launch={selectedLaunch}
            rocket={selectedRocket}
            setSelectedLaunch={setSelectedLaunch}
          />
        )
      }
    </div>
  );
};
