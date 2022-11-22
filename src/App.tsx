import React, { useEffect, useState } from 'react';

import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { getLaunces } from './api/launches';
import { Launch } from './types/launch';
import { LaunchList } from './components/LaunchList';

export const App: React.FC = () => {
  const [launchesFromServer, setLaunchesFromServer] = useState<Launch[]>([]);

  const loadData = async () => {
    const response = await getLaunces();

    setLaunchesFromServer(response.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className='app'>
      <Header />

      <main className='catalog'>
        <LaunchList 
          launches={launchesFromServer}
        />

      </main>

      <Footer />
    </div>
  );
};
