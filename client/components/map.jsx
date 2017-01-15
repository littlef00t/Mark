import React from 'react';
import MarkerManager from '../util/markerManager';

const sf = {lat: 37.7758, lng: -122.435};

let _mapOptions = {
  center: sf,
  zoom: 13
};

class TerritoryMap extends React.Component{
//sets up map, markerManager, searchBox
  componentDidMount(){
    this.addTerritory = this._addTerritory.bind(this);
    this.addAndMark = this._addAndMark.bind(this);
    // let service;
    let infoWindow;
    const mapNode = this.refs.map;

    this.map = new google.maps.Map(mapNode, _mapOptions);
    this.markerManager = new MarkerManager(
      this.map,
      this._addTerritory.bind(this),
      this._addAndMark.bind(this)
    );


    let input = document.getElementById('place-input');
    this.searchBox = new google.maps.places.SearchBox(input);
    this.searchBox.bindTo('bounds', this.map);
    this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(input);

//add listener to searchBox input changed, updates markers
    this.searchBox.addListener('places_changed', () => {
      let places = this.searchBox.getPlaces();

      let bounds = new google.maps.LatLngBounds();
      this.markerManager.updateMarkers(places, bounds);
    });
  }

//add territory to to-do list
  _addTerritory(place, id){
    this.props.addTerritory(place, id);
  }

//add territory and mark to marked list
  _addAndMark(place){
    this.props.addAndMark(place);
  }

  _renderInfoWindow(place){
    return (
      <div>
        <h1>{place.name}</h1>
        <button onClick={this.addTerritory}>Add to Mark</button>
        <button onClick={this.addAndMark}>Marked</button>
      </div>
    )
  }

  render(){
    const mapContainerStyle = {
      width: '100%',
      height: '100vh',
      position: 'relative'
    };

    return (
      <div>
        <input id='place-input' type='text' placeholder='Search Box' />
        <div id='map-container' ref='map' style={mapContainerStyle}></div>
      </div>
    )
  }
}

export default TerritoryMap;
