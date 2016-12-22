/**
 * Created by muratguney on 21/12/2016.
 */
import data from './reducers';
import {createStore, applyMiddleware, combineReducers} from 'redux';

export const rootReducer = combineReducers({
    data
});
