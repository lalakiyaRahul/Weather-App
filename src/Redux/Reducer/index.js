import { combineReducers } from 'redux';
import WeatherFlowReducer from './WeatherFlowReducer';

export default combineReducers({
    WeatherState: WeatherFlowReducer,
})