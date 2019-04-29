import React from 'react'
import {Link} from 'react-router-dom'

const NotFound = () => {
	return (
		<div>
			<h2> Not Found </h2>
			<p> The page you're looking for does not exist. </p>
			<p>
				<a>Click </a>
				<Link to="/">here</Link>
				<a> to return to main page.</a>
			</p>
		</div>	
	)
}

export default NotFound

