import React, { Component } from 'react'

import Content from './Content'
import Sidebar from './Sidebar'

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
