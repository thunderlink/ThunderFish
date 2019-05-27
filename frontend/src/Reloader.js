import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from './actions'

class Reloader extends Component {
	/*
	constructor(props) {
		super(props)
		this.props.setUserRequest()
	}
	*/
	render() {
		return(
			<div/>
		)
	}
}

const mapStateToProps = state => {
}

const mapDispatchToProps = dispatch => {
	return {
		setUserRequest: () => {
			dispatch(actions.user.getUserRequest())
		}
	}
}

export default(mapStateToProps, mapDispatchToProps)(Reloader)
