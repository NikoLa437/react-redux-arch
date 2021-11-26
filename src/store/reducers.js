import { combineReducers } from 'redux'
import signInReducer from './signIn/reducer'
import appReducer from './app/reducer'
import { connectRouter } from 'connected-react-router'
import history from '../utils/history'

// kada se kreira novi reducer samo se ubaci da ga vidi sistem
export default combineReducers({
    router: connectRouter(history),
    signInReducer,
    appReducer
})