# Marked

Marked is a frontend web application built utilizing Google Maps Places API, React, Redux, Node(npm), Webpack, Babel and pure CSS.

To see in action: git pull, npm install, run webpack, and open index.html

## Motivation

As a huge fan of dogs (especially Akitas), I've noticed how much dogs like to establish dominance by marking their territory. I've created this frontend app to help dogs keep track of where they have marked so they can feel accomplished at the end of the day.

## Functionality

Pups should be able to search on the map for where they have peed or what kind of place they would like to pee at. Marker(s) will pop up that match the search. Click on marker for location name and to mark/undo. Once location is marked, it will be saved and shown in the Marked list box. Action can be undone by removing the location on the list or undoing it in the infowindow. Marked territories will remain on map through other queries.

* Google Maps API have been utilized to create the map, markers, infowindows, searchBox, and legend.

* Redux store contains the state of the app which contains the territories that have been marked by the user.

* Actions include marking and unmarking territories that are dispatched to the reducer that update the territories without mutating the original state passed in.

* MarkerManager keeps track of the markers once a place is searched in the query box. Marker Manager also keeps track of marked territories keeping them on the map even as other queries occur.

* Store is passed down to the entire App in Root. State and dispatch actions are connected to React components in SearchContainer.

* Legend provided to describe what marked and unmarked territories look like on map.

* MarkedList uses access to the territory state to list names of places marked. Removal on list is connected to map. Once marked territory is removed, the marker associated to the location goes back to unmarked territory color and it is removed from the list.

* PropTypes have been added to check if right props are supplied to the component. Schema contains Territory properties needed in state.
(https://facebook.github.io/react/docs/typechecking-with-proptypes.html)


## Future plans

* Add location services to pee and mark at the same time
* Add time and date to keep track of places each day
* Sign in with paw print authorization
* Track all users and see what other pups have peed in your territory so you can go back and pee over it
