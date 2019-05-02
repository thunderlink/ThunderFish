import React, { Component } from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'

import { Provider } from "react-redux"
import { createStore } from "redux"

import Main from "./components/Main/Main"
import NotFound from "./components/NotFound"
import Toolbar from "./components/Toolbar/Toolbar"
import Footer from "./components/Toolbar/Footer"
import Signin from "./components/Register/Signin"
import Signup from "./components/Register/Signup"
import Userpage from "./components/Userpage/Userpage"
import Meetingpage from "./components/Meeting/Meetingpage"
class App extends Component {
	render() {
		return (
			<div>
				<main style={{marginTop: '64px'}}>
					<BrowserRouter>
						<Switch>
							<Route exact path="/" component={Main} />
							<Route exact path="/signin" component={Signin} />
							<Route exact path="/signup" component={Signup} />
							<Route exact path="/user/:id" component={Userpage} />
							<Route exact path="/meeting/:id" component={Meetingpage} />
							<Route component={NotFound} />
						</Switch>
					</BrowserRouter>
				</main>
				<Toolbar />
				<Footer />
			</div>
		)
	}
}

export default App
