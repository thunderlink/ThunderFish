import React, { Component } from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'

import { Provider } from "react-redux"
import { createStore, applyMiddleware } from "redux"

import Main from "components/Main/Main"
import NotFound from "components/NotFound"
import Signin from "components/Register/Signin"
import Signup from "components/Register/Signup"
import UserPage from "components/UserPage/UserPage"
import UserEditPage from "components/UserPage/UserEditPage"
import MeetingPage from "components/Meeting/MeetingPage"
import SearchPage from "components/Search/SearchPage"
import MeetingAddPage from "components/Meeting/MeetingAddPage"
import MeetingEditPage from "components/Meeting/MeetingEditPage"
import Footer from "components/Layout/Footer"
import Header from "components/Layout/Header"

import './Content.css'

class Content extends Component {

	render() {
		return (
			<div className="major-content">
				<Route component={Header}/>
				<main className="main-content">
					<Switch>
						<Route exact path="/" component={Main} />
						<Route exact path="/signup" component={Signup} />
						<Route exact path="/user/:id" component={UserPage} />
						<Route exact path="/user/:id/edit" component={UserEditPage} />
						<Route exact path="/meeting/add" component={MeetingAddPage}/>
						<Route exact path="/meeting/:id" component={MeetingPage} />
						<Route exact path="/meeting/:id/edit" component={MeetingEditPage} />
						<Route exact path="/search/:query" component={SearchPage} />
						<Route exact path="/search/:query/:options" component={SearchPage} />
						<Route component={NotFound} />
					</Switch>
				</main>
				<Footer />
			</div>
		)
	}
}

export default Content
