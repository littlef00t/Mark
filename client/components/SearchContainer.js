//connects state and props to Search
import { connect } from 'react-redux';
import SearchMap from './SearchMap';
import { unmarkTerritory, toggleMark, markTerritory } from '../actions/territories_actions';

const mapStatetoProps = state => ({
  territories: state.territories
})

const mapDispatchtoProps = dispatch => ({
  markTerritory: place => dispatch(markTerritory(place)),
  unmarkTerritory: index => dispatch(unmarkTerritory(index))
})

export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(SearchMap);
