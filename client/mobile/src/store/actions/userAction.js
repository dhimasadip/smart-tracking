
import http from '../../config/axios'

export function login({ email, password }) {
  return async (dispatch) => {
    const { data: user } = await http.post('/login', { email, password });
    
    dispatch({
      type: 'GET_USER',
      payload: { user }
    })
  }
}

