import React, { Component } from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'

import { Provider } from "react-redux"
import { createStore } from "redux"

import Main from "./components/Main/Main"
import NotFound from "./components/NotFound"
import Toolbar from "./components/Toolbar/Toolbar"
import Signin from "./components/Register/Signin"
import Signup from "./components/Register/Signup"

class App extends Component {
	render() {
		return (
			<div>
				<Toolbar />
				<main style={{marginTop: '70px'}}>
					<BrowserRouter>
						<Switch>
							<Route exact path="/" component={Main} />
							<Route exact path="/signin" component={Signin} />
							<Route exact path="/signup" component={Signup} />
							<Route component={NotFound} />
						</Switch>
					</BrowserRouter>
				</main>
			</div>
		)
	}
}

export default App
