import React, { Component } from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'

import { Provider } from "react-redux"
import { createStore, applyMiddleware } from "redux"
import createSagaMiddleware from 'redux-saga'

import rootReducer from "./reducers/index"
import rootSaga from "./store"

import Main from "./components/Main/Main"
import NotFound from "./components/NotFound"
import ToolBar from "./components/molecules/ToolBar"
import Footer from "./components/molecules/Footer"
import Signin from "./components/Register/Signin"
import Signup from "./components/Register/Signup"
import Userpage from "./components/Userpage/Userpage"
import MeetingPage from "./components/Meeting/MeetingPage"
import SearchPage from "./components/Search/SearchPage"
import MeetingAddPage from "./components/Meeting/MeetingAddPage"
import MeetingEditPage from "./components/Meeting/MeetingEditPage"

import MajorView from './MajorView'

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
						<Route component={MajorView} />
					</Switch>
				</BrowserRouter>
			</Provider>
		</div>
  );
}

export default App;
