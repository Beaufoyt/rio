import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, browserHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

import Routes from './components/Routes';
import configureStore from './helpers/configureStore';

import './styles/index.scss';

const store = configureStore();

const otherRender = () => {
    render(
        <Provider store={store}>
            <Router history={browserHistory}>
                <Routes />
            </Router>
        </Provider>,
        document.getElementById('app'),
    );
};

if (module.hot) {
    module.hot.accept();
}

otherRender();
