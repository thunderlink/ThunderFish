import React from 'react'
import {Link} from 'react-router-dom'

const NotFound = () => {
	return (
		<div>
			<h2> Not Found </h2>
			<p> The page you're looking for does not exists.</p>
			<p>
				Click
				<Link to="/"> here</Link>
				to return to main page.
			</p>
		</div>	
	)
}

export default NotFound

