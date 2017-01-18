import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import MarkerManager from '../util/markerManager';
import MarkedList from './MarkedList';
import territorySchema from '../schemas/territorySchema';

const sf = {lat: 37.7758, lng: -122.435};

const _mapOptions = {
  center: sf,
  zoom: 12
};

const MARKED_IMAGE =
  "http://res.cloudinary.com/littlef00t/image/upload/v1484540058/darkpurplepawprint_fzt9jb.png";

const UNMARKED_IMAGE =
  "http://res.cloudinary.com/littlef00t/image/upload/v1481759433/ojvig5yzrbwt1fzej4wc.png";

class TerritoryMap extends React.Component{
  componentDidMount(){
    this.renderInfoWindow = this._renderInfoWindow.bind(this);

    const mapNode = this.refs.map;

    this.map = new google.maps.Map(mapNode, _mapOptions);
    this.markerManager = new MarkerManager(
      this.map,
      this.renderInfoWindow
    );

//creating and placing searchbox
    const input = document.getElementById('place-input');
    this.searchBox = new google.maps.places.SearchBox(input);
    this.searchBox.bindTo('bounds', this.map);
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

//placing legend on map
    const legend = document.getElementById('legend');
    this.map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(legend);

//add listener to searchBox input changed, updates markers
    this.searchBox.addListener('places_changed', () => {
      let places = this.searchBox.getPlaces();

      let bounds = new google.maps.LatLngBounds();
      this.markerManager.updateMarkers(places, bounds);
    });
  }

//add territory to to-do list
  _markorUnmarkTerritory(place, e){
    const {
      markTerritory
    } = this.props;

    const markers = this.markerManager.getMarkers();
    const marker = markers.filter(marker =>
      marker.position === place.geometry.location
    );

    if (e.target.textContent === 'Mark'){
      markTerritory(place);
      e.target.textContent = 'Undo';
      marker[0].setIcon(
        MARKED_IMAGE
      );
      this.markerManager.addToMarked(marker[0]);
    } else {
      this._removeTerritory(place);
    }
  }

  _removeTerritory(place){
    const {
      unmarkTerritory,
      territories
    } = this.props;

    const markers = this.markerManager.getMarkers();
    const marker = markers.filter(marker =>
      marker.position === place.geometry.location
    );

    const index = territories.indexOf(place);
    unmarkTerritory(index);
    marker[0]['infowindow']['content'].lastChild.lastChild.textContent = 'Mark';
    marker[0].setIcon(
      UNMARKED_IMAGE
    );
    this.markerManager.removeFromMarked(marker[0]);
  }

  _renderInfoWindow(place){
    return (
      <div className='info-window'>
        <h3>{place.name}</h3>
        <button onClick={this._markorUnmarkTerritory.bind(this, place)}>Mark</button>
      </div>
    )
  }

  render(){
    return (
      <div className='outer-container'>
        <input id='place-input' className='search-bar' type='text' placeholder='Search for pee spot' />
        <div id='map-container' ref='map'></div>
        <MarkedList {...this.props} unmarkTerritory={this._removeTerritory.bind(this)}/>
        <div id='legend'>
          <p><img src={MARKED_IMAGE} />Territories</p>
          <p className="tag-line"><img src={UNMARKED_IMAGE} />Possible territories</p>
        </div>
      </div>
    )
  }
}

export default TerritoryMap;

TerritoryMap.propTypes = {
  territories: PropTypes.arrayOf(territorySchema).isRequired,
  markTerritory: PropTypes.func.isRequired,
  unmarkTerritory: PropTypes.func.isRequired
}
