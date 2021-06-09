const INITIAL_STATE = {
    GetCountryData:[],
}

const WeatherFlowReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case 'GetCountrySuccess':
            console.log("GetSubCategories Success ", state)
            return {
                ...state,
                GetCountryData: action.payload.responseJson.list,
            }
        case 'GetCountryFailed':
            console.log("GetSubCategories failed ", action.payload.responseJson)
            return {
                ...state,
                GetCountryData: action.payload.responseJson.list,
            }
            default:
                return state;
        }
    }

    export default WeatherFlowReducer;
