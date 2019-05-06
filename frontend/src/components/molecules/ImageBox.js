import React, { Component } from 'react'

import './ImageBox.css'

class ImageBox extends Component {
	render() {
		return (
			<div className="image_box">
				<div class="photo_cutter">
					<img
						src={this.props.src}
					/>
				</div>
			</div>
		)
	}
}

export default ImageBox;
