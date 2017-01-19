import React, {PropTypes} from 'react';

class MarkedList extends React.Component{

  render(){
    const {
      territories,
      unmarkTerritory
    } = this.props;
    return(
      <div className='marked-list'>
        <div className='heading'>
          <h3>Marked Territories</h3>
          <p className='description'>Search on map for where you pups have peed and mark by clicking on marker</p>
        </div>
        <div className='scroll'>
          <ul>
            {territories.map((territory, i) => {
              return (<li key={i}>{territory.name}&nbsp;&nbsp;&nbsp;
                <button
                  className='remove-button'
                  onClick={() => unmarkTerritory(territory)}>X</button>
              </li>)
            })
          }
          </ul>
        </div>
      </div>
    );
  }
};

export default MarkedList;

MarkedList.propTypes = {
  unmarkTerritory: PropTypes.func.isRequired,
  territories: PropTypes.array.isRequired
}
