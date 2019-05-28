import React, { Component } from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'

import { Provider } from "react-redux"
import { createStore, applyMiddleware } from "redux"

import Main from "../Main/Main"
import NotFound from "../NotFound"
import Footer from "../molecules/Footer"
import Signin from "../Register/Signin"
import Signup from "../Register/Signup"
import UserPage from "../UserPage/UserPage"
import UserEditPage from "../UserPage/UserEditPage"
import MeetingPage from "../Meeting/MeetingPage"
import SearchPage from "../Search/SearchPage"
import MeetingAddPage from "../Meeting/MeetingAddPage"
import MeetingEditPage from "../Meeting/MeetingEditPage"

import Header from "./Header"

import './Content.css'

class Content extends Component {

	render() {
		return (
			<div className="major-content">
				<Route component={Header}/>
				<main style={{marginTop: '64px'}}>
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
			</div>
		)
	}
}

export default Content
