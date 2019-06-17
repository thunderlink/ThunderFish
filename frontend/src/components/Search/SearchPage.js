import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from 'store/actions'

import Loading from 'components/Loading'
import MeetingList from 'components/molecules/MeetingList'
import { KakaoSelectMap } from 'components/molecules/KakaoMap'

import './SearchPage.css'

class SearchPage extends Component {

	state = {
		tag_flag: false,
		dist_flag: false,

		query: '',
		latitude: 0.0,
		longitude: 0.0,
		dist: '',
		tagword: '',
		region: '',
	}

	constructor(props) {
		super(props)
		this.props.waitRequest()
		this.state.query = this.props.match.params.query
		this.props.getMeetingListRequest({
			keyword: this.state.query,
			tag_flag: false,
			dist_flag: false,
		})
	}

	componentWillUnmount() {
		this.props.waitRequest()
	}

	static getDerivedStateFromProps(props, state) {
		if(props.match.params.query !== state.query) {
			props.waitRequest()
			props.getMeetingListRequest({
				keyword: props.match.params.query,
				tag_flag: false,
				dist_flag: false,
			})
			return {
				tag_flag: false,
				dist_flag: false,
				query: props.match.params.query
			}
		}
		else
			return null
	}

	onChangePlace = (newState) => {
		this.setState(newState)
	}

	onClickMeeting = (id) => (e) => {
		this.props.waitRequest()
		this.props.history.push(`/meeting/${id}/`)
	}

	onSubmitHandler = (e) => {
		e.preventDefault();
		this.props.getMeetingListRequest({
			keyword: this.state.query,
			tagword: this.state.tagword,
			latitude: this.state.latitude,
			longitude: this.state.longitude,
			dist: this.state.dist,

			tag_flag: this.state.tag_flag,
			dist_flag: this.state.dist_flag
		})
	}

	render() {
		return (!true /*this.props.loadDone*/) ?
			(
				<Loading/>
			) :	(
				<div className="search-page">
					<div className="search-title">
						<h1> {this.props.match.params.query} 검색 결과 </h1>
						<hr />
					</div>
					<div className="search-content">
						<div className="search-list">
							<MeetingList meetings={this.props.meetingList} />
						</div>
						<div className="search-option">
							<div className="search-option__title">
								<h2> 검색 옵션 </h2>
							</div>
							<div className="search-option-item">
								<p className="search-option-item__title"> 태그 검색 </p>
								<div className="search-option-item-field">
									<div className="search-option-item__checkbox">
										<input 
											type="checkbox" checked={this.state.tag_flag}
											onChange={(e) => this.setState({tag_flag: e.target.checked})}
										/>
										<p className="search-option-item-discription__default"> 
											사용 
										</p>
									</div>
									{
										(this.state.tag_flag) ? (
										<div className="search-option-item-selector">
												<div className="search-option-item__input">
													<input 
														type="text" value={this.state.tagword}
														onChange={(e) => this.setState({tagword: e.target.value})}
														placeholder="검색할 태그를 쉼표로 구분하여 입력해주세요."
													/>
													<p> 포함 </p>
												</div>
											</div>
										) : (null)
									}
								</div>
							</div>
							<div className="search-option-item">
								<p className="search-option-item__title"> 위치 검색 </p>
								<div className="search-option-item-field">
									<div className="search-option-item__checkbox">
										<input 
											type="checkbox" checked={this.state.dist_flag}
											onChange={(e) => this.setState({dist_flag: e.target.checked})}
										/>
										<p className="search-option-item-discription__default"> 
											사용 
										</p>
									</div>
									{
										(this.state.dist_flag) ? (
											<div className="search-option-item-selector">
												<KakaoSelectMap 
													onChangePlace={this.onChangePlace}
													latitude={this.state.latitude}
													longitude={this.state.longitude}
													region={this.state.region}
													enableRegion={false}
												/>
												<div className="search-option-item__input">
													<input type="number" value={this.state.dist}
														onChange={(e) => this.setState({dist: e.target.value})}
														placeholder="해당 위치부터 최대 거리를 입력해주세요."
													/>
													<p> Km 이내 </p>
												</div>										
											</div>
										) : (null)
									}
								</div>
							</div>
							<button onClick={this.onSubmitHandler} className="search-option-submit"> 확인 </button>
						</div>
					</div>
				</div>
		)	
	}
}

const mapStateToProps = state => {
	return {
		meetingList: state.meeting.meetingList,
		loadDone: state.meeting.loadDone
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getMeetingListRequest : (query) => {
			dispatch(actions.meeting.getMeetingListRequest(query))
		},
		waitRequest: () => {
			dispatch(actions.meeting.waitRequest())
		},
		getMeetingRequest: (id) => {
			dispatch(actions.meeting.getMeetingRequest(id))
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage)
