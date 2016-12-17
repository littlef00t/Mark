import { connect } from 'react-redux';
import TodoList from './TodoList';
import { requestShelters } from '../actions/shelters_actions';
import { updateBounds } from '../actions/filter_actions';

const mapStatetoProps = state => ({
  territories: state.territories
})

const mapDispatchtoProps = dispatch => ({
  addTerritory: dispatch => ({type: 'ADD_TERRITORY', territory}),
  removeTerritory: dispatch => ({type: 'REMOVE_TERRITORY', territory}),
  markTerritory: dispatch => ({type: 'MARK_TERRITORY', territory})
})

export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(TodoList);
