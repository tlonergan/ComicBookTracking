import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import {Provider} from 'react-redux';
import Promise from 'es6-promise';

import configureStore from './store/configureStore';
import initialStore from './store/initialStore';
import App from './components/App';
import WantList from './containers/wantList';
import Search from './containers/search';
import ComicVine from './containers/comicVine';
require('./styles/_main.scss');

// apply browser polyfills
Promise.polyfill();
if (!window.location.origin) {
  window.location.origin = window.location.protocol + '//' +
    window.location.hostname + (window.location.port ? ':' +
    window.location.port : '');
}

const store = configureStore(initialStore);

ReactDOM.render(
	<Provider store={store}>
		<Router history={hashHistory}>
			<Route component={App}>
				<Route path="/" component={WantList} pageTitle="Want Lists" />
				<Route path="/wantList" component={WantList} pageTitle="Want Lists" />
				<Route path='/search' component={Search} pageTitle='Search' />
				<Route path='/comicVine' component={ComicVine} pageTitle='Comic Vine' />
			</Route>
		</Router>
	</Provider>,
  document.getElementById('app')
)