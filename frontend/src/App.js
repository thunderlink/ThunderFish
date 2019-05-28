import React, { Component } from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'

import { Provider } from "react-redux"
import { createStore, applyMiddleware } from "redux"
import createSagaMiddleware from 'redux-saga'

import rootReducer from "store/reducers"
import rootSaga from "store/sagas"

import Signin from "components/Register/Signin"
import Signup from "components/Register/Signup"
import Signout from "components/Register/Signout"

import MajorView from "components/Layout/MajorView"
import './App.css'

const sagaMiddleware = createSagaMiddleware()
let store = createStore(rootReducer,
	applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(rootSaga)

function App() {
  return (
		<div className="app-wrapper">
			<Provider store={store}>
				<BrowserRouter>
					<Switch>
						<Route exact path="/signin/" component={Signin} />
						<Route exact path="/signup/" component={Signup} />
						<Route exact path="/signout/" component={Signout} />
						<Route component={MajorView} />
					</Switch>
				</BrowserRouter>
			</Provider>
		</div>
  );
}

export default App;
