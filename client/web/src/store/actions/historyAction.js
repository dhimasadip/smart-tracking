export function getHistories() {
  return async (dispatch) => {
    const res = await fetch(`http://54.255.56.32:3000/location/histories`);
    const data = await res.json();
    dispatch({
      type: 'GET_HISTORIES',
      payload: data
    })
  }
}

