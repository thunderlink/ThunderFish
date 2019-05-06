import React, { Component } from 'react'
import './Leg.css'
import { Category } from '../category.js'

class Leg extends Component {
	state = {
		currentTab: 0
	}

	render() {
		return (
			<div className="leg">
				<div class="category-big">
					<ul class="list-big">
						{Category.map((item, index) => (
							<li
								onMouseOver={e => this.setState({currentTab: index})}
							> 
								{item.big}
							</li>
						))}
					</ul>
				</div>
				<div class="category-small">
					<ul class="list-small">
						{Category[this.state.currentTab].small.map((item) => (
							<li
								onClick={e => {}}
							>
								{item}
							</li>
						))}
					</ul>
					<div class="list-recommend">
						Explanation will be written on here.
					</div>
				</div>
			</div>
		)
	}
}

export default Leg
