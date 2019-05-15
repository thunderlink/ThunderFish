import React, { Component } from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'

import { Provider } from "react-redux"
import { createStore } from "redux"

import rootReducer from "./reducers/index"

import Main from "./components/Main/Main"
import NotFound from "./components/NotFound"
import Toolbar from "./components/Toolbar/Toolbar"
import Footer from "./components/Toolbar/Footer"
import Signin from "./components/Register/Signin"
import Signup from "./components/Register/Signup"
import Userpage from "./components/Userpage/Userpage"
import MeetingPage from "./components/Meeting/MeetingPage"
import SearchPage from "./components/Search/SearchPage"
import MeetingAddPage from "./components/Meeting/MeetingAddPage"

import './App.css'

let store = createStore(rootReducer)

class App extends Component {

	render() {
		return (
			<Provider store={store}>
				<main style={{marginTop: '64px'}}>
					<BrowserRouter>
						<main style={{marginTop: '64px'}}>
							<Switch>
								<Route exact path="/" component={Main} />
								<Route exact path="/signin" component={Signin} />
								<Route exact path="/signup" component={Signup} />
								<Route exact path="/user/:id" component={Userpage} />
								<Route exact path="/meeting/add" component={MeetingAddPage}/>
								<Route exact path="/meeting/:id" component={MeetingPage} />
								<Route exact path="/search/:query" component={SearchPage} />
								<Route exact path="/search/:query/:options" component={SearchPage} />
								<Route component={NotFound} />
							</Switch>
						</main>
						<Route component={Toolbar} />
						<Footer />
					</BrowserRouter>
				</main>
			</Provider>
		)
	}
}

export default App
