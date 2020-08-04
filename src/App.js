import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { CSSReset } from '@chakra-ui/core';
import ColorMode from './components/ColorMode';
import Layout from './components/Layout';
import Report from './components/Report';
import { Global } from './components/Global';
import { siteList } from './utils/siteList';

const initialState = {
  checkedItems: siteList,
  stats: null,
  jsonReports: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_CHECKED_ITEMS':
      return { ...state, checkedItems: action.checkedItems };
    case 'SET_STATS':
      return { ...state, stats: action.stats };
    case 'SET_JSON_REPORTS':
      return { ...state, jsonReports: action.jsonReports };
    default:
      return initialState;
  }
};

const App = () => {
  return (
    <Global initialState={initialState} reducer={reducer}>
      <ColorMode>
        <CSSReset />
        <Router>
          <Switch>
            <Route exact path={'/'} component={Layout} />
            <Route path={'/:id'} component={Report} />
            {/* <Route component={UhOh404} /> */}
          </Switch>
        </Router>
      </ColorMode>
    </Global>
  );
};

export default App;
