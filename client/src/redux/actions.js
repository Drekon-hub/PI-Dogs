import axios from 'axios';

export function getDogs() {
  return async function (dispatch) {
    let json = await axios.get('http://localhost:3001/dogs');
    return dispatch({
      type: 'GET_DOGS',
      payload: json.data,
    });
  };
}

export function getDetail(id) {
  return async function (dispatch) {
    try {
      let json = await axios.get(`http://localhost:3001/dogs/${id}`);
      return dispatch({
        type: 'GET_DETAIL',
        payload: json.data,
      });
    } catch (error) {
      console.error(error);
    }
  };
}

export function postDogs(payload) {
  return async function (dispatch) {
    const data = await axios.post('http://localhost:3001/dogs', payload);
    return data;
  };
}

export function dogSearchBar(name) {
  return async function (dispatch) {
    try {
      let json = await axios.get(`http://localhost:3001/dogs?name=${name}`);
      // console.log(json.data)
      if (json.data.length === 0) return alert('No existe dicha raza');
      return dispatch({
        type: 'GET_DOG_SEARCH',
        payload: json.data,
      });
    } catch (error) {
      alert('No existe dicha raza');
    }
  };
}

export function getTemperament() {
  return async function (dispatch) {
    const json = await axios.get('http://localhost:3001/temperament');
    return dispatch({
      type: 'GET_TEMP',
      payload: json.data,
    });
  };
}

export function order(payload) {
  console.log(payload);
  return {
    type: 'ORDER',
    payload,
  };
}

export function filterDogsByTemperament(payload) {
  return async function (dispatch) {
    try {
      const json = await axios.get(
        `http://localhost:3001/filter?temperament=${payload}`
      );
      return dispatch({
        type: 'FILTER_DOGS_BY_TEMPERAMENT',
        payload: json.data,
      });
    } catch (error) {
      console.log(error, 'Something Wrong');
    }
  };
}
export function filterDogsByCreated(payload) {
  return {
    type: 'FILTER_BY_CREATED',
    payload,
  };
}
export function filterWeight(payload) {
  return {
    type: 'FILTER_WEIGHT',
    payload,
  };
}
export function filterTemperament(payload) {
  return async function (dispatch) {
      try {
    
        const json = await axios.get(`/temperaments/filter?temperament=${payload}`);
 //   console.log(json);
        return dispatch({
              type:  'FILTER_DOGS_BY_TEMPERAMENT',
              payload: json.data
         
         
            })
      } catch (error) {
          console.log('Something Wrong')
      }
  }
}