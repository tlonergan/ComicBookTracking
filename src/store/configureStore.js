import {createStore, applyMiddleware} from 'redux';
import {apiMiddleware} from 'redux-api-middleware';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import reducer from '../reducers/index';

const middleware = [
	thunkMiddleware,
	apiMiddleware,
	promiseMiddleware
];

export default function configureStore(initialState){
	return applyMiddleware(...middleware)(createStore)(reducer, initialState);
}