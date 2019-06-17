import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from 'store/actions'

import MeetingList from 'components/molecules/MeetingList'
import { KakaoSelectMap } from 'components/molecules/KakaoMap'

import './SearchPage.css'

class SearchPage extends Component {

	state = {
		tag_flag: false,
		dist_flag: false,

		latitude: 0.0,
		longitude: 0.0,
		dist: '',
		tagword: '',
		region: '',

		keyword: '',
		options: '',
	}

	constructor(props) {
		super(props)
		this.props.waitRequest()
		this.state.keyword = this.props.match.params.query
		this.state.option = this.props.match.params.option

		this.props.getMeetingListRequest(SearchPage.parseOption(this.props.match.params.query, this.props.match.params.options))
		this.state = SearchPage.parseOption(this.props.match.params.query, this.props.match.params.options)
	}

	componentWillUnmount() {
		this.props.waitRequest()
	}

	static getDerivedStateFromProps(props, state) {
		if(props.match.params.query !== state.keyword ||
			props.match.params.options !== state.options) {
			props.getMeetingListRequest(SearchPage.parseOption(props.match.params.query, props.match.params.options))
			return {
				keyword: props.match.params.query,
				options: props.match.params.options
			}
		}
		else
			return null
	}

	static parseOption = (query, option) => {
		let parsedOption = {
			title_flag: true,
			tag_flag: false,
			dist_flag: false,
			tagword: '',
			dist: ''
		}

		if(query === undefined || query === '')
			parsedOption.title_flag = false
		else
			parsedOption.keyword = query

		if(option !== undefined && option !== '') {
			option.split('+').map(flag => {
				if(flag.startsWith('tag&')) {
					parsedOption.tag_flag = true
					parsedOption.tagword = flag.split('&')[1]
				}
				else if(flag.startsWith('dist&')) {
					let subOption = flag.split('&')[1]
					parsedOption.dist_flag = true
					parsedOption.latitude = subOption.split('_')[0]
					parsedOption.longitude = subOption.split('_')[1]
					parsedOption.dist = subOption.split('_')[2]
				}
				return null
			})
		}
		console.log(parsedOption)
		return parsedOption
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
		let uri = `/search/`

		if(this.state.query !== undefined)
			uri = uri.concat(this.state.keyword, '/')
		else 
			uri = uri.concat('/')

		if(this.state.tag_flag) {
			uri = uri.concat('tag&', this.state.tagword, '+')
		}
		if(this.state.dist_flag) {
			uri = uri.concat('dist&', this.state.latitude, '_', this.state.longitude, '_', this.state.dist)
		}

		this.props.history.push(uri)
	}

	render() {
		return (
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
														onSubmit={this.onSubmitHandler}
														placeholder="태그는 공백으로 구분합니다."
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
														onSubmit={this.onSubmitHandler}
														placeholder="거리를 입력해주세요."
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
