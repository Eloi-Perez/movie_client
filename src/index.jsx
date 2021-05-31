import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import moviesApp from './reducers/reducers';
import { devToolsEnhancer } from 'redux-devtools-extension';

import MainView from './components/main-view/main-view';

import './index.scss';

const store = createStore(moviesApp, devToolsEnhancer());

// Main component
class MyFlixApplication extends React.Component {
  render() {
    return(
     <Provider store={store}>
          <MainView />
      </Provider>
    );
  }
}

// Find the root
const container = document.getElementsByClassName('app-container')[0];

// Render app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);