import React, { Component } from 'react'

import './ImageBox.css'

class ImageBox extends Component {
	render() {
		return (
			<div className="image_box">
				<div className="photo_cutter">
					<img
						src={this.props.src}
						alt={this.props.alt}
					/>
				</div>
			</div>
		)
	}
}

export default ImageBox;
