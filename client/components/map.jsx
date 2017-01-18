import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import MarkerManager from '../util/markerManager';
import MarkedList from './MarkedList';

const sf = {lat: 37.7758, lng: -122.435};

const _mapOptions = {
  center: sf,
  zoom: 13
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


    let input = document.getElementById('place-input');
    this.searchBox = new google.maps.places.SearchBox(input);
    this.searchBox.bindTo('bounds', this.map);
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

//add listener to searchBox input changed, updates markers
    this.searchBox.addListener('places_changed', () => {
      let places = this.searchBox.getPlaces();

      let bounds = new google.maps.LatLngBounds();
      this.markerManager.updateMarkers(places, bounds);
    });
  }

//add territory to to-do list
  _markorUnmarkTerritory(place, e){
    let markers = this.markerManager.getMarkers();
    let marker = markers.filter(marker =>
      marker.position === place.geometry.location
    );

    if (e.target.textContent === 'Mark'){
      this.props.markTerritory(place);
      e.target.textContent = 'Undo';
      marker[0].setIcon(MARKED_IMAGE);
      this.markerManager.addToMarked(marker[0]);
    } else {
      let idx = this.props.territories.indexOf(place);
      this.props.unmarkTerritory(idx);
      e.target.textContent = 'Mark';
      marker[0].setIcon(UNMARKED_IMAGE);
      this.markerManager.removeFromMarked(marker[0]);
    }
  }

  _removeTerritoryFromList(idx, place){
    let markers = this.markerManager.getMarkers();
    let marker = markers.filter(marker =>
      marker.position === place.geometry.location
    );
    this.props.unmarkTerritory(idx);
    marker[0]['infowindow']['content'].lastChild.lastChild.textContent = 'Mark';
    marker[0].setIcon(UNMARKED_IMAGE);
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
        <input id='place-input' className='controls' type='text' placeholder='Search for Territories' />
        <div id='map-container' ref='map'></div>
        <MarkedList {...this.props} unmarkTerritory={this._removeTerritoryFromList.bind(this)}/>
      </div>
    )
  }
}

export default TerritoryMap;

TerritoryMap.propTypes = {
  territories: PropTypes.array.isRequired,
  markTerritory: PropTypes.func.isRequired,
  unmarkTerritory: PropTypes.func.isRequired
}
