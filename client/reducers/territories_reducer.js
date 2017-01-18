const TerritoriesReducer = (state = [], action) => {
  switch(action.type){
    case 'UNMARK_TERRITORY':
      return [
        ...state.slice(0, action.index),
        ...state.slice(action.index + 1)
      ];
      break;
    case 'MARK_TERRITORY':
      return [ ...state, action.place];
      break;
    default:
      return state;
      break;
  }
}

export default TerritoriesReducer;
