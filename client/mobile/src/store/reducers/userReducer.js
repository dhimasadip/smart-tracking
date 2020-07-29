const initialState = {
    user: {},
    devices: [],
    buzzer: false
}

function userReducer(state = initialState, { payload, type }) {
    switch (type) {
        case 'GET_USER':
            return {
                ...state,
                user: payload.user,
            }
        case 'GET_DEVICES':
            return {
                ...state,
                devices: payload.devices,
            }

        case 'SET_BUZZER':
            return {
                ...state,
                buzzer: payload.buzzer,
            }
        default:
            return state
    }
}

export default userReducer;