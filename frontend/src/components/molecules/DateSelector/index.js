import React, { Component } from 'react'


import './DateSelector.css'

export default class DateSelector extends Component {

	state = {
		year: 2019,
		month: 1,
		day: 1,
		hour: 0,
		minute: 0,
	}

	createYear = () => {
		return [2019, 2020, 2021]
	}

	createMonth = () => {
		return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
	}

	createDay = (year, month) => {
		console.log(`${this.state.year}year${this.state.month}month`)
		var maxDay = 0;
		var ret = [];
		switch(this.state.month) {
			case 1:
			case 3:
			case 5:
			case 7:
			case 8:
			case 10:
			case 12:
				maxDay = 31;
				break;
			case 4:
			case 6:
			case 9:
			case 11:
				maxDay = 30;
				break;
			case 2:
				if(((this.state.year % 4 === 0) && (this.state.year % 100 !== 0)) || (this.state.year % 400 === 0))
					maxDay = 29;
				else
					maxDay = 28;
				break;
			default:
				maxDay = 0;
		}
		for(var i = 1; i <= maxDay; i++) {
			ret.push(i);
		}
		console.log(ret)
		return ret;
	}

	createHour = () => {
		var ret = [];
		for(var i = 1; i <= 24; i++) {
			ret.push(i);
		}
		return ret;
	}

	createMinute = () => {
		var ret = [];
		for(var i = 0; i < 60; i = i + 10) {
			ret.push(i);
		}
		return ret;
	}

	controlChange = (src) => {
		this.setState(src);
		this.props.onChangeHandler(`${this.state.year}-
			${(this.state.month < 10) ? `0${this.state.month}` : this.state.month}-
			${(this.state.month < 10) ? `0${this.state.day}` : this.state.day}T
			${(this.state.hour < 10) ? `0${this.state.hour}` : this.state.hour}:
			${(this.state.minute < 10) ? `0${this.state.minute}` : this.state.minute}`
		)
	}

	render() {
		return (
			<div className="date-selector">
				<form>
					<select onChange={(e) => this.controlChange({year: e.target.value})}>
						{
							this.createYear().map((year) => (
								<option value={year}> {year} </option>
							))
						}
					</select>
					<p> 년 </p>
					<select onChange={(e) => this.controlChange({month: e.target.value})}>
						{
							this.createMonth().map((month) => (
								<option value={month} key={`month_${month}`}> {month} </option>
							))
						}
					</select>
					<p> 월 </p>
					<select onChange={(e) => this.controlChange({day: e.target.value})}>
						{
							this.createDay().map((day) => (
								<option value={day}> {day} </option>
							))
						}
					</select>
					<p> 일 </p>
					<select onChange={(e) => this.controlChange({hour: e.target.value})}>
						{
							this.createHour().map((hour) => (
								<option value={hour}> {hour} </option>
							))
						}
					</select>
					<p> 시 </p>
					<select onChange={(e) => this.controlChange({minute: e.target.value})}>
						{
							this.createMinute().map((minute) => (
								<option value={minute}> {minute} </option>
							))
						}
					</select>
					<p> 분 </p>				
				</form>
			</div>
		)
	}
}

