import ReactDOM from 'react-dom';

export default class MarkerManager {
  constructor(map, renderInfoWindow){
    this.map = map;
    this.renderInfoWindow = renderInfoWindow;
    this.markers = [];
    this.marked = [];
    this._createMarker = this._createMarker.bind(this);
    this._removeMarker = this._removeMarker.bind(this);
  }

  updateMarkers(locations, bounds){
    this.bounds = bounds;
    this.locations = locations;
    this._locationsToAdd().forEach(this._createMarker);
    this._markersToRemove().forEach(this._removeMarker);
    this.map.fitBounds(this.bounds);
  }

  getMarkers(){
    return this.markers;
  }

  addToMarked(marker){
    this.marked.push(marker);
  }

  removeFromMarked(marker){
    let i = this.marked.indexOf(marker);
    this.marked.splice(i, 1);
  }

  _locationsToAdd(){
    const currentMarkers = this.markers.map( marker => marker.id );
    return this.locations.filter( location => !currentMarkers.includes(location.id));
  }

  _markersToRemove(){
    const locationIds = this.locations.map( location => location.id );
    return this.markers.filter( marker => !locationIds.includes(marker.id));
  }

  _createMarker(place){
    let contentString = document.createElement('div');
    ReactDOM.render(this.renderInfoWindow(place), contentString);

    let infowindow = new google.maps.InfoWindow({
      content: contentString,
    });

    let pawprint = "http://res.cloudinary.com/littlef00t/image/upload/v1481759433/ojvig5yzrbwt1fzej4wc.png";

    let marker = new google.maps.Marker({
      map: this.map,
      title: place.name,
      icon: pawprint,
      position: place.geometry.location,
      id: place.id,
      infowindow
    });


    marker.addListener('click', () => {
      if (!infowindow.opened) {
        infowindow.open(this.map, marker);
        infowindow.opened = true;
      } else {
        infowindow.close();
        infowindow.opened = false;
      }
    });

    this.markers.push(marker);

    if (place.geometry.viewport) {
       this.bounds.union(place.geometry.viewport);
     } else {
       this.bounds.extend(place.geometry.location);
     }
  }

  _removeMarker(marker){
    if (!this.marked.includes(marker)){
      const i = this.markers.indexOf(marker);
      this.markers[i].setMap(null);
      this.markers.splice(i, 1);
    }
  }
}
