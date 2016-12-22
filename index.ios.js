import React from 'react';
import App from './app/Main/index';
import {Provider} from 'react-redux';
import ReduxPromise from 'redux-promise';
import {rootReducer} from './app/store';
import {createStore, applyMiddleware} from 'redux';
import data from "./app/Main/data";
import {AppRegistry} from 'react-native';

const createStoreWithMiddlevare = applyMiddleware(ReduxPromise)(createStore);

export default class ReactNativePart extends React.Component {

    render() {
        return (
            <Provider store={createStoreWithMiddlevare(rootReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
                <App data={data} />
            </Provider>
        );
    }
}


AppRegistry.registerComponent('ReactNativePart', () => ReactNativePart);

