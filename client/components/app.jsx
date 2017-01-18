import React from 'react';
import SearchContainer from './SearchContainer';

const App = () => (
  <div>
    <div className='center'>
      <h1>Marked
        <img className="paw-print-marked"
          src="https://www.thesage.com/images/PawPrint.png" /></h1>
        <p className='tag-line'>For dogs to keep track of their territory</p>
    </div>
    <SearchContainer />
  </div>
);

export default App;
