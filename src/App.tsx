import React, { useEffect, useState } from 'react';

import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { getLaunces } from './api/launches';
import { Launch } from './types/launch';
import { LaunchList } from './components/LaunchList';

export const App: React.FC = () => {
  const [launchesFromServer, setLaunchesFromServer] = useState<Launch[]>([]);

  const loadData = async () => {
    const temp = await getLaunces();

    setLaunchesFromServer(temp);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="App">
      <Header />

      <main>
        <LaunchList 
          launches={launchesFromServer}
        />
        Main
      </main>

      <Footer />
    </div>
  );
};
