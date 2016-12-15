import React from 'react';
import { render } from 'react-dom';

import GreightfulHeader from './components/GreightfulHeader.jsx';
import MainContent from './containers/MainContent.jsx';

class App extends React.Component {
  render() {
    return (
      <div className='container'>
        <GreightfulHeader />
        <MainContent />
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));
