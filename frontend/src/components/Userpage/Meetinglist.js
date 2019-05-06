import React, { Component } from 'react'

class Meetinglist extends Component {
	render() {
		const meetings = [
			{id: 1, name:"Soccer", host:"Seo"},
			{id: 2, name:"Basketball", host:"Kim"}
		]

		return(
			<div className="Meeting_list">
				<table class="list_table">
					<tr>
						<td> Host </td>
						<td> Name </td>
					</tr>
						{
							meetings.map((item) => {
								return(
									<tr>
										<td> {item.host} </td>
										<td> {item.name} </td>
									</tr>
								)
							})
						}
				</table>
			</div>
		)
	}
}

export default Meetinglist
