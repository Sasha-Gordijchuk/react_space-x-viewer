import React from 'react';
import { Footer } from './components/Footer';
import { Header } from './components/Header';

export const App: React.FC = () => {
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
