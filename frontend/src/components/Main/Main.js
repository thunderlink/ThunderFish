import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import Chest from './Chest'
import Leg from './Leg'

import './Main.css'

class Main extends Component {

	render() {
		return (
			<div className="main_page">
				<Route component= {Chest} />
				<Route component= {Leg} />
			</div>
		)
	}
}



export default Main
