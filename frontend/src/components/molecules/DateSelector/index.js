import React, { Component } from 'react'

import DatePicker from 'react-datepicker'
import moment from 'moment'
import ko from 'date-fns/locale/ko'

import 'react-datepicker/dist/react-datepicker.css'
import './DateSelector.css'

export default class DateSelector extends Component {
	render() {
		return (moment(this.props.selected).isValid()) ? (
			<DatePicker
				selected={moment(this.props.selected).toDate()}
				onChange={this.props.onChange}
				minDate={new Date()}
				dateFormat="yyyy년 MM월 dd일 HH:mm"
				placeholderText="날짜를 입력해주세요."
				name={this.props.name}
				locale={ko}
				showTimeSelect
			/>
		) : (
			null
		)
	}
}

