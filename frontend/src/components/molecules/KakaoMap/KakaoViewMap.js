/* global daum */

import React, { Component } from 'react'

import './KakaoMap.css'

export default class KakaoViewMap extends Component {

	state = {
		currentLatitude: '',
		currentLongitude: '',
		currentRegion: '',

		map: null,
		marker: null,
		infowindow: null,

		mapLoaded: false,
	}

	constructor(props) {
		super(props);
		this.state.mapLoaded = false
	}

	componentDidMount() {
		this.createViewMap()
	}

	static getDerivedStateFromProps(props, state) {
		if(props.latitude !== state.currentLatitude ||
			props.longitude !== state.currentLongitude) {
			state.map.setCenter(new daum.maps.LatLng(props.latitude, props.longitude))
			state.marker.setPosition(new daum.maps.LatLng(props.latitude, props.longitude))

			return {
				currentLatitude: props.latitude,
				currentLongitude: props.longitude
			}
		}
		if(props.region !== state.currentRegion) {
			state.infowindow.setContent(`<div>${props.region}</div>`)
			state.infowindow.open(state.map, state.marker)
			return {
				currentRegion: props.region
			}
		}
	}
	createViewMap = () => {
		if(this.state.mapLoaded)
			return;

		console.log("making view map")

		var coord = new daum.maps.LatLng(this.props.latitude, this.props.longitude)
		var container = document.getElementById(`kakao-map-view`);

		var options = {
			center: coord
		}

		var map = new daum.maps.Map(container, options)
		var zoomControl = new daum.maps.ZoomControl()

		var marker = new daum.maps.Marker({
			position: coord,
			zIndex:10,
		})

		var infoContent = `<div>${this.props.region}</div>`
		var infowindow = new daum.maps.InfoWindow({
			position: coord,
			content: infoContent,
		})

		map.addControl(zoomControl, daum.maps.ControlPosition.RIGHT)
		marker.setMap(map)
		infowindow.open(map, marker)

		this.setState({
			currentLatitude: this.props.latitude,
			currentLongitude: this.props.longitude,
			map: map,
			marker: marker,
			infowindow: infowindow
		})

		this.setState({mapLoaded: true})
	}

	render() {
		return (
			<div className="kakao-map__view">
				<div id={`kakao-map-view`}
					className="kakao-content"
				/>
			</div>
		)
	}
}
