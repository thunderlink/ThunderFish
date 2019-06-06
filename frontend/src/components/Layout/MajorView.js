import React, { Component } from 'react'

import Content from 'components/Layout/Content'
import Sidebar from 'components/Layout/Sidebar'
import Footer from 'components/Footer/Footer'

export default class MajorView extends Component {
	render() {
		return (
			<div className="major-view">
				<Sidebar />
				<Content />
				<Footer />
			</div>
		)
	}
}
