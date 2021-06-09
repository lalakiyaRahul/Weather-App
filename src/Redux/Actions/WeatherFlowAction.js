import {GetCountrySuccess,GetCountryFailed} from './ActionsType';


// for get country
export function getCountrySuccessTrue(responseJson) {
  return dispatch => {
    dispatch({ type: GetCountrySuccess, payload: { responseJson } })
  }
}

export function getCountrySuccessFalse(responseJson) {
  return dispatch => {
    dispatch({ type: GetCountryFailed, payload: { responseJson } })
  }
}

export const GetCountryApi = (longi,lati) => {
  return (dispatch) => {
    //   dispatch(loading());
    var uploadUrl = `http://api.openweathermap.org/data/2.5/find?lat=${lati}&lon=${longi}&cnt=50&appid=6bfd2bd8f437acf3cfc5311b7a4df231`
    fetch(uploadUrl, {
      method: 'GET',
      headers: {
        // Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify({
      //   'sessid': sessid,
      //   'participant_id': participant_id,
      // })
    }).then((response) => response.json())
      .then((responseJson) => {
        console.log("myPlan=====>", responseJson);
        if (responseJson.cod === "200") {
          dispatch(getCountrySuccessTrue(responseJson));
        }
        else {
          dispatch(getCountrySuccessFalse(responseJson));
        }
      })
      .catch(error => { console.log('Request Failed: ', error); });
  }
}
