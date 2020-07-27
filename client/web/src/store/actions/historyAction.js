export function getHistories() {
  return async (dispatch) => {
    const res = await fetch(`http://54.255.56.32:3000/location/histories`);
    const data = await res.json();
    for(let i = 0; i < data.length; i++){
      data[i].lat = data[i]['latitude'];
      data[i].lng = data[i]['longitude'];
      delete data[i].latitude;
      delete data[i].longitude;
    }
    dispatch({
      type: 'GET_HISTORIES',
      payload: data
    })
  }
}

