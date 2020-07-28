export function getCurrent() {
  return async (dispatch) => {
    const res = await fetch(`http://54.255.56.32:3000/location/current`);
    const data = await res.json();
    dispatch({
      type: 'GET_CURRENT',
      payload: data
    })
  }
}

