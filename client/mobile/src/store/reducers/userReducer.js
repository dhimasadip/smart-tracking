const initialState = {
    user: {},
}

function userReducer(state = initialState, { payload, type }) {
    switch (type) {
        case 'GET_USER':
            return {
                ...state,
                user: payload.user,
            }
        default:
            return state
    }
}

export default userReducer;