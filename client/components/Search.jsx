import React from 'react';
import TerritoryMap from './map';

const Search = ({territories, markTerritory, unmarkTerritory}) => (
      <div>
        <TerritoryMap territories={territories}
          markTerritory={markTerritory}
          unmarkTerritory={unmarkTerritory}/>
      </div>
);

export default Search;
