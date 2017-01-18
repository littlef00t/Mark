import React from 'react';
import TerritoryMap from './map';

const SearchMap = ({territories, markTerritory, unmarkTerritory}) => (
      <div>
        <TerritoryMap territories={territories}
          markTerritory={markTerritory}
          unmarkTerritory={unmarkTerritory}/>
      </div>
);

export default SearchMap;
