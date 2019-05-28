import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import * as actions from '../../actions'

class Signout extends Component {
	constructor(props) {
		super(props);
		this.props.signout();
	}
	render() {
		return(
			<Redirect to="/">
			</Redirect>
		)
	}
}

const mapStateToProps = state => {
	return {
	}
}

const mapDispatchToProps = dispatch => {
	return {
		signout: () => {
			dispatch(actions.user.signout())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Signout)
