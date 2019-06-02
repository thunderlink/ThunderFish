import React, { Component } from 'react'

import background from 'logos/loading-bg.png'
import circle from 'logos/loading-circle.png'

import './Loading.css'

export default class Loading extends Component {
	render() {
		return(
			<div className="loading-wrapper">
				<div className="loading-components">
					<div className="loading-image">
						<img 
							src={background}
							className="background" 
							alt="thunder"/>
						<img 
							src={circle}
							className="circle"
							alt="fish"
						/>
					</div>
					<h1> Loading...	</h1>
				</div>
			</div>
		)
	}
}

