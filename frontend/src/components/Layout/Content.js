import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import Main from "components/Main"
import NotFound from "components/NotFound"
import UserPage from "components/UserPage/UserPage"
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
						<Route exact path="/user/:id" component={UserPage} />
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
