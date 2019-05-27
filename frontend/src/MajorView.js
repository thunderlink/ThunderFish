import React, { Component } from 'react'

import Content from './components/Content'
import Sidebar from './components/Sidebar'

export default class MajorView extends Component {
	render() {
		return (
			<div className="major-view">
				<Sidebar />
				<Content />
			</div>
		)
	}
}
