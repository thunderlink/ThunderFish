import React, { Component } from 'react'
import logo from '../../logos/logo_renewal.png'

import Searchbar from '../molecules/Searchbar'
import Chest from './Chest'
import Leg from './Leg'

import './Main.css'

class Main extends Component {

	render() {
		return (
			<div className="main_page">
				<Searchbar />
				<Chest />
				<Leg />
			</div>
		)
	}
}

export default Main
