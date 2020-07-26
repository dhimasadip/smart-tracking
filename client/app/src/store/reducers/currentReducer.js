const initialState = {
  current: null,
}

function currentReducer (state = initialState, action) {
  switch (action.type) {
    case 'GET_CURRENT':
      return {
        ...state,
        current: action.payload,
      }
    default:
      return state
  }
}

export default currentReducer;