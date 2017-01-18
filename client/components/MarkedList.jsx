import React from 'react';

class MarkedList extends React.Component{

  unmarkTerritory(i, territory){
    this.props.unmarkTerritory(i, territory);
  }

  render(){
    let marked = this.props.territories;
    return(
      <div className='marked-list'>
        <h3 className='center'>Marked Territories</h3>
          <ul className='scroll'>
            {marked.map((territory, i) => {
                return (<li key={i}>{territory.name}
                          <button
                            onClick={this.unmarkTerritory.bind(this, i, territory)}>X</button>
                        </li>)
                  })
              }
          </ul>
      </div>
    );
  }
};

export default MarkedList;
