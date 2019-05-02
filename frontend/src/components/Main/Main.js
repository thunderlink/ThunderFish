import React, { Component } from 'react'
import logo from '../../logos/logo_renewal.png'
import search_button from '../../icons/search-button.png'
import small_logo from '../../logos/small_logo.png'
import './Main.css'

import Head from './Head'
import Chest from './Chest'
import Leg from './Leg'

class Main extends Component {

	render() {
		const Categories = ["Sports", "Games", "Study", "Etc"]
		return (
			<div className="main">
				<Head />
				<Chest />
				<Leg />
			</div>
		)
	}
}

export default Main
