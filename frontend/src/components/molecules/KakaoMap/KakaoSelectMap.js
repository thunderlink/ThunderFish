/* global daum */

import React, { Component } from 'react'

import './KakaoMap.css'

export default class KakaoViewMap extends Component {

	state = {
		keyword: '',
		address: '',

		map: null,
		ps: null,
		infowindow: null,
		highlightedInfowindow: null,
		pagination: null,
		searchResult: [],
		geocoder: null,

		markers: [],
		clickedMarker: null,
		
		mapLoaded: false,
	}

	constructor(props) {
		super(props);
		this.state.mapLoaded = false
	}

	componentDidMount() {
		this.createSelectMap()
	}
	
	createSelectMap = () => {
		if(this.state.mapLoaded)
			return;

		var mapContainer = document.getElementById(`kakao-map-select`)
		var mapOption = {
      center: new daum.maps.LatLng(37.460011, 126.951262),
      level: 8
		}
		var zoomControl = new daum.maps.ZoomControl()

		var map = new daum.maps.Map(mapContainer, mapOption)
		map.addControl(zoomControl, daum.maps.ControlPosition.RIGHT)

		var staticInfowindow = new daum.maps.InfoWindow({zIndex:1})
		staticInfowindow.setContent(`<div style="padding:5px;font-size:12px;font-weight:600;">선택되었습니다.</div>`)

		daum.maps.event.addListener(map, 'click', (e) => {
			if(this.state.clickedMarker !== null) {
				this.state.clickedMarker.setMap(null)
			}

			var marker = new daum.maps.Marker()

			marker.setPosition(e.latLng)
			marker.setMap(map)
			this.setState({
				clickedMarker: marker
			})
			this.state.highlightedInfowindow.open(this.state.map, marker);

			this.state.geocoder.coord2Address(
				e.latLng.getLng(), 
				e.latLng.getLat(),
				(result, status) => {
					if(status === daum.maps.services.Status.OK) {
						this.setState({
							address: result[0].address.address_name,
						})
						this.props.onChangePlace({
							latitude: `${e.latLng.getLat()}`,
							longitude: `${e.latLng.getLng()}`,
							region: ''
						}) 
					}
				}
			)
		})

		this.setState({
			map: map,
			ps: new daum.maps.services.Places(),
			infowindow: new daum.maps.InfoWindow({zIndex:2}),
			highlightedInfowindow: staticInfowindow, 
			geocoder: new daum.maps.services.Geocoder()
		})
		this.setState({
			mapLoaded: true
		})
	}

	placeSearchCB = (data, status, pagination) => {
		this.removeMarker()
		this.setState({pagination: pagination})
		if(status === daum.maps.services.Status.OK) {
			var bounds = new daum.maps.LatLngBounds()
			data.map((item) => {
        this.displayMarker(item);    
				bounds.extend(new daum.maps.LatLng(item.y, item.x));
				return null;
			})

			this.state.map.setBounds(bounds);

			this.setState({searchResult: data})
		}
		else {
		}
	}

	displayMarker = (place) => {
		var marker = new daum.maps.Marker({
			map: this.state.map,
			position: new daum.maps.LatLng(place.y, place.x) 
		})

		this.setState({markers: [...this.state.markers, marker]})

		daum.maps.event.addListener(marker, 'mouseover', () => {
			this.state.infowindow.setContent(`<div style="padding:5px;font-size:12px;">${place.place_name}</div>`)
			this.state.infowindow.open(this.state.map, marker);
		})

		daum.maps.event.addListener(marker, 'mouseout', () => {
			this.state.infowindow.close()
		})

		daum.maps.event.addListener(marker, 'click', () => {
			this.state.highlightedInfowindow.open(this.state.map, marker)
			
			this.state.geocoder.coord2Address(
				place.x, 
				place.y,
				(result, status) => {
					if(status === daum.maps.services.Status.OK) {
						this.setState({
							address: result[0].address.address_name,
						})
						this.props.onChangePlace({
							region: place.place_name, 
							longitude: place.x,
							latitude: place.y,
						}) 
					}
				}
			)
		})
	}

	removeMarker = () => {
		this.state.markers.map(marker => {
			marker.setMap(null)
			return null
		})
		this.setState({markers: []})
	}

	onClickNext = (e) => {
		e.preventDefault()
		this.removeMarker()
		this.state.pagination.nextPage()
	}

	onClickPrev = (e) => {
		e.preventDefault()
		this.removeMarker()
		this.state.pagination.prevPage()
	}

	onClickItem = (place) => (e) => {
		e.preventDefault()
		this.state.map.setCenter(new daum.maps.LatLng(place.y, place.x))
		this.state.map.setLevel(3)
	}

	onSubmitHandler = (e) => {
		e.preventDefault()
		this.state.ps.keywordSearch(this.state.keyword, this.placeSearchCB)
	}

	render() {
		return (
			<div className="kakao-map__select">
				<div id={`kakao-map-select`}
					className="kakao-content"
				/>
				<div className="kakao-search-field">
					<form className="keyword-form" onSubmit={this.onSubmitHandler}>
						<input 
							className="keyword-input" type="text" 
							value={this.state.keyword} 
							onChange={(e) => this.setState({keyword: e.target.value})}
						/>
						<button className="keyword-submit" type="submit"> 장소 검색 </button>
					</form>
					<ul className="kakao-search-list">
						{
							this.state.searchResult.map(item => (
								<li className="kakao-search-item"
									key={`${item.id}_${item.place_name}`}
								>
									<div className="place-detail">
										<p
											style={{fontWeight: '600', color: '#000000'}}
											className="place-name"
										> 
											{item.place_name} 
										</p>
										<p
											style={{color: "#495057"}}
											className="place-address"
										> 
											{item.address_name} 
										</p>
									</div>
									<button onClick={this.onClickItem(item)}> 보기 </button>
								</li>
							))
						}
					</ul>
					{
						(this.state.pagination === null) ? (
							<div />
						) : (
							<div className="page-button">
								{
									(this.state.pagination.hasPrevPage) ? (
										<button onClick={this.onClickPrev}> {'<'} </button>
									) : (<div/>)
								}
								<p> {this.state.pagination.current} </p>
								{
									(this.state.pagination.hasNextPage) ? (
										<button onClick={this.onClickNext}> {'>'} </button>
									) : (<div/>)
								}
							</div>
						)
					}
				</div>
				<div className="results">
					<p className="results-address"> 
						<strong> 주소 </strong> 
						{(this.state.address==='') ? "지도를 클릭해주세요." : this.state.address} 
					</p>
					{
						(this.props.enableRegion) ? (
							<p className="results-place">
								<strong> 장소 </strong>
								<input 
									value={this.props.region} 
									onChange={(e) => this.props.onChangePlace({region: e.target.value})}
									placeholder="지도에서 위치를 선택하거나, 직접 입력하세요."
								/>
							</p>
						) : (null)
					}
				</div>
			</div>
		)
	}
}
