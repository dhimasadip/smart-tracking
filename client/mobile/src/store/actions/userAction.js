
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


export function listDevice({ token }) {
  return async (dispatch) => {
    const { data: devices } = await http.get('/devices', { headers: { token } });
    const { data: buzzer } = await http.get(`/buzzer/${devices[0].Device.deviceSerial}`);

    dispatch({
      type: 'SET_BUZZER',
      payload: { buzzer: buzzer.isActive }
    })

    dispatch({
      type: 'GET_DEVICES',
      payload: { devices }
    })
  }
}


export function setBuzzer({ status, id, token }) {
  return async (dispatch) => {
    
    try {
      const {data: buzzer} = await http.post(`/buzzer/${id}/${status}`, {}, { headers: { token } });
      dispatch({
        type: 'SET_BUZZER',
        payload: { buzzer: buzzer.isActive }
      })
    } catch (error) {
      console.log(error.message)
    }
    


  }
}



