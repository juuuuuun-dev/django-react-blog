import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import TagManager from 'react-gtm-module'

if (process.env.REACT_APP_GTM) {
  const tagManagerArgs = {
    gtmId: process.env.REACT_APP_GTM
  }
  TagManager.initialize(tagManagerArgs)
}

ReactDOM.render(<App />, document.getElementById('root'));
