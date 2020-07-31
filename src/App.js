import React from 'react';
import './App.css';
import { CSSReset } from '@chakra-ui/core';
import ColorMode from './components/ColorMode';
import Layout from './components/Layout';

function App() {
  return (
    <div>
      <main>
        <ColorMode>
          <CSSReset />
          <Layout />
        </ColorMode>
      </main>
    </div>
  );
}

export default App;
