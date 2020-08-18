import React from 'react';
import { MainPage, CartPage, ItemPage } from '../pages';
import AppHeader from '../app-header';
import {Route, Switch} from 'react-router-dom';

import Background from './food-bg.jpg';
import { connect } from 'react-redux';

const App = ({totalPrice}) => {
	return (
		<div style={{ background: `url(${Background}) center center/cover no-repeat` }} className="app">
			<AppHeader total={totalPrice} />
			<Switch>
				<Route path="/" exact component={MainPage} />
				<Route path="/cart" component={CartPage} />
				<Route path="/:id" component={ItemPage} />
			</Switch>
		</div>
	)
}

const mapStateToProps = ({totalPrice}) => {
	return {totalPrice};
}


export default connect(mapStateToProps)(App);