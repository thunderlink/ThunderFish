import React from 'react'
import { Link } from 'react-router-dom'

import not_found from 'icons/not-found.png'

import './NotFound.css'

const NotFound = () => {
	return (
		<div className="not-found">
			<h1> 404 Not Found </h1>
			<img src={not_found} alt="no thunder" />
			<p> 요청하신 페이지는 없거나 삭제되었습니다. </p>
			<p>
				<Link to="/">여기</Link>
				{"를 누르면 첫화면으로 돌아갑니다."}
			</p>
		</div>	
	)
}

export default NotFound

