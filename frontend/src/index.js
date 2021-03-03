import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import TagManager from 'react-gtm-module'

if (process.env.REACT_APP_GTM && process.env.NODE_ENV === 'production') {
  const tagManagerArgs = {
    gtmId: process.env.REACT_APP_GTM
  }
  TagManager.initialize(tagManagerArgs)
}

ReactDOM.render(<App />, document.getElementById('root'));
