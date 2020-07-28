export function getCurrent() {
  return async (dispatch) => {
    const res = await fetch(`http://54.255.56.32:3000/devices/1/current`,{
      headers: {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTU5NTg2MTQxOH0.ynOGgRX4FYWF3gCAZIuGtt72kXsx3oMKtRfDwPYmtLk'
      }
    });
    const data = await res.json();
    dispatch({
      type: 'GET_CURRENT',
      payload: data
    })
  }
}

