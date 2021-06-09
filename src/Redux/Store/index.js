import AsyncStorage from '@react-native-community/async-storage';
import { createStore, applyMiddleware,compose } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import rootReducer from '../Reducer/index'
import ReduxThunk from 'redux-thunk';
import logger from 'redux-logger';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}

let composeEnhancers = compose;
 if(__DEV__) {
     composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
 }

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
    let store = createStore(persistedReducer,composeEnhancers( applyMiddleware(ReduxThunk, logger)), );
    let persistor = persistStore(store)
    return { store, persistor }
}
