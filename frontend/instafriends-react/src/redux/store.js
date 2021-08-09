import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import {usersReducer , loginReducer, postReducer} from './reducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    user: loginReducer,
    allUsers: usersReducer,
    posts: postReducer
})

const store = createStore(
    rootReducer, 
    composeEnhancers(applyMiddleware(thunkMiddleware)));
    // applyMiddleware(thunkMiddleware));

export default store;