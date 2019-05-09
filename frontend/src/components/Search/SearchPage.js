import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'

import SearchBar from '../molecules/SearchBar'
import MeetingElement from './MeetingElement'

import './SearchPage.css'

class SearchPage extends Component {

	onClickMeeting = (id) => (e) => {
		this.props.history.push(`/meeting/${id}/`)
	}

	render() {
		const meetings = [
			{
				name: "축구",
				date: "2019년 5월 5일 17:00",
				host: "서준원",
				region: "서울특별시 관악구 관악로1 대운동장",
				id: 0
			},
			{
				name: "컴개실",
				date: "2019년 5월 10일 17:00",
				host: "이성찬",
				photo: "https://4.imimg.com/data4/CO/YS/MY-29352968/samsung-desktop-computer-500x500.jpg",
				region: "서울특별시 관악구 관악로1 301동 314호",
				id: 1
			}	
		]
		return(
			<div className="search_page">
				<Route component={SearchBar} />
				<div class="search_content">
					<div class="search_option">
					</div>				
					<div class="search_list">
						{meetings.map(item => (
							<div 
								onClick={this.onClickMeeting(item.id)}
							>
								<MeetingElement
									name={item.name}
									date={item.date}
									host={item.host}
									region={item.region}
									photo={item.photo}
								/>
							</div>
						))}
					</div>
				</div>
			</div>
		)	
	}
}


export default SearchPage
