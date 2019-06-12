import React, { Component } from 'react'

import Content from 'components/Layout/Content'
import Sidebar from 'components/Layout/Sidebar'

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
