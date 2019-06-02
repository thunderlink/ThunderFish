/* global daum */

import React, { Component } from 'react'

import './KakaoMap.css'

class KakaoMap extends Component {
	componentDidMount() {
		this.createMap();
	}

	createMap = () => {
		var coord = new daum.maps.LatLng(33.450701, 126.570667)
		var container = document.getElementById('kakao_map');

		var options = {
			center: coord
		}

		var map = new daum.maps.Map(container, options)
		var zoomControl = new daum.maps.ZoomControl()

		var marker = new daum.maps.Marker({
			position: coord
		});

		var infoContent = `<div>${this.props.name}</div>`
		var infowindow = new daum.maps.InfoWindow({
			position: coord,
			content: infoContent
		})

		map.addControl(zoomControl, daum.maps.ControlPosition.RIGHT)
		marker.setMap(map)
		infowindow.open(map, marker)
	}

	render() {
		return (
			<div id="kakao_map"
				className="kakao_content"
			/>
		)
	}
}

export default KakaoMap
