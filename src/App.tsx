import React, { useEffect, useState } from 'react';

import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { getLaunces } from './api/launches';
import { Launch } from './types/launch';
import { LaunchList } from './components/LaunchList';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Loader } from './components/Loader';

const LIMIT = 4;

export const App: React.FC = () => {
  const [launchesFromServer, setLaunchesFromServer] = useState<Launch[]>([]);
  const [visibleLaunches, setVisibleLaunches] = useState<Launch[]>([]);
  // const [sortedLaunches, setSortedLaunches] = useState<Launch[]>([]);
  const [launchesCounter, setLaunchesCounter] = useState<number>(LIMIT);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const loadData = async () => {
    const response = await getLaunces();

    setLaunchesFromServer(response.data);
  };

  useEffect(() => {
    loadData();

    // setSortedLaunches(launchesFromServer.sort((
    //   { date_unix: first },
    //   { date_unix: second },
    // ) => {
    //   if (first && second) {
    //     return second - first;
    //   }
  
    //   return 0;
    // }));
  }, []);

  useEffect(() => {
    setVisibleLaunches(launchesFromServer.slice(0, LIMIT));
  }, [launchesFromServer]);
  

  const fetchData = () => {
    const newLimit = launchesCounter + LIMIT;
    const launchesToAdd = launchesFromServer.slice(launchesCounter, newLimit);

    if (launchesFromServer.length > visibleLaunches.length) {
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
            overflow: 'visible'
          }}
        >
          <LaunchList 
            launches={visibleLaunches}
          />
        </InfiniteScroll>
      </main>

      <Footer />
    </div>
  );
};
