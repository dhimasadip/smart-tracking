const initialState = {
  histories: [],
}

function historyReducer (state = initialState, action) {
  switch (action.type) {
    case 'GET_HISTORIES':
      return {
        ...state,
        histories: action.payload,
      }
    default:
      return state
  }
}

export default historyReducer;