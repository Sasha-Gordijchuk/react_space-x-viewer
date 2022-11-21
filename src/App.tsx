import React, { useEffect, useState } from 'react';

import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { getLaunces } from './api/launches';
import { Launch } from './types/launch';

export const App: React.FC = () => {
  const [launchesFromServer, setLaunchesFromServer] = useState<Launch[]>([]);

  const loadData = async () => {
    const temp = await getLaunces();

    setLaunchesFromServer(temp);
  };

  useEffect(() => {
    loadData();
  }, []);

  console.log(launchesFromServer);  

  return (
    <div className="App">
      <Header />

      <main>
        Main
      </main>

      <Footer />
    </div>
  );
};
