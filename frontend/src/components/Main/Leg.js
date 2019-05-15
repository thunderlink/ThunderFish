import React, { Component } from 'react'

import './Leg.css'

import { Category } from '../category.js'

class Leg extends Component {
	state = {
		currentTab: 0
	}

	onClickLink = (item) => (e) => {
		e.preventDefault()
		this.props.history.push(`/search/${item.replace("/", " ")}`)
	}


	render() {
		return (
			<div className="leg">
				<div className="category_big">
					<ul className="list_big">
						{Category.map((item, index) => (
							<li
								onMouseOver={e => this.setState({currentTab: index})}
							> 
								{item.big}
							</li>
						))}
					</ul>
				</div>
				<div className="category_small">
					<ul className="list_small">
						{Category[this.state.currentTab].small.map((item) => (
							<li
								onClick={this.onClickLink(item)}
							>
								{item}
							</li>
						))}
					</ul>
					<div className="list-recommend">
						Explanation will be written on here.
					</div>
				</div>
			</div>
		)
	}
}

export default Leg
