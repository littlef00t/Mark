import React, {PropTypes} from 'react';

class MarkedList extends React.Component{

  render(){
    const {
      territories,
      unmarkTerritory
    } = this.props;
    return(
      <div className='marked-list'>
        <h3 className='vh center'>Marked Territories</h3>
        <p className='description'>Search on map for territories and mark by clicking on marker</p>
          <ul className='scroll'>
            {territories.map((territory, i) => {
                return (<li key={i}>{territory.name}
                          <button
                            onClick={() => unmarkTerritory(territory)}>X</button>
                        </li>)
                  })
              }
          </ul>
      </div>
    );
  }
};

export default MarkedList;

MarkedList.propTypes = {
  unmarkTerritory: PropTypes.func.isRequired,
  territories: PropTypes.array.isRequired
}
