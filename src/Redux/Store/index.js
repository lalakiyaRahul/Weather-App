import AsyncStorage from '@react-native-community/async-storage'
import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import rootReducer from '../Reducer/index'
import ReduxThunk from 'redux-thunk';
import logger from 'redux-logger';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
    let store = createStore(persistedReducer, {}, applyMiddleware(ReduxThunk, logger));
    let persistor = persistStore(store)
    return { store, persistor }
}
