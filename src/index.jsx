import React from 'react';
import { render } from 'react-dom';
// import { createStore } from 'redux';
// import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';

import App from './components/App';
// import rootReducer from './reducers';
import configureStore from './helpers/configureStore';

import './styles/index.scss';

const store = configureStore();

// const store = createStore(rootReducer);

const otherRender = () => {
    render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('app'),
    );
};

if (module.hot) {
    module.hot.accept();
}

otherRender();
