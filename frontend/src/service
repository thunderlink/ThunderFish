const api = {}

api.getMeeting = (url, token) => {
	let headers = {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		'Authorization': `Token ${token}`
	}

	return fetch(url, {headers, method: "GET"})
		.then(res => {
			if(res.status < 500) {
				return res.json().then(data => {
					return {
						status: res.status,
						data : data
					}
				})
			}
			else {
				console.log("Server Error!")
				return {
					status: res.status,
					data: res
				}
			}
		})
}

api.postMeeting = (url, meeting, token) => {
	let headers = {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		'Authorization': `Token ${token}`
	}

	let body = JSON.stringify(meeting)

	return fetch(url, {headers, method: "POST", body})
		.then(res => {
			if(res.status < 500) {
				return res.json().then(data => {
					return {
						status: res.status,
						data : data
					}
				})
			}
			else {
				console.log("Server Error!")
				return {
					status: res.status,
					data: res
				}
			}
		})
}

api.putMeeting = (url, id, meeting, token) => {
	let headers = {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		'Authorization': `Token ${token}`
	}

	let body = JSON.stringify(meeting)

	return fetch(`${url}${id}/`, {headers, method: "PUT", body})
		.then(res => {
			if(res.status < 500) {
				return res.json().then(data => {
					return {
						status: res.status,
						data : data
					}
				})
			}
			else {
				console.log("Server Error!")
				return {
					status: res.status,
					data: res
				}
			}
		})
}

api.deleteMeeting = (url, id, token) => {
	let headers = {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		'Authorization': `Token ${token}`
	}

	return fetch(`${url}${id}/`, {headers, method: "DELETE"})
		.then(res => {
			if(res.status < 500) {
				return res.status
			}
			else {
				console.log("Server Error!")
				return {
					status: res.status,
					data: res
				}
			}
		})
}

api.logIn = (url, name, passwd) => {
	let headers = {
		Accept: 'application/json',
		'Content-Type': 'application/json'
	}
	let body = JSON.stringify({username: name, password: passwd})

	return fetch(url, {headers, method: "POST", body})
		.then(res => {
			if(res.status < 500) {
				return res.json().then(data => {
					return {
						status: res.status,
						data : data
					}
				})
			}
			else {
				console.log("Server Error!")
				return {
					status: res.status,
					data: res
				}
			}
		})
}

export default api
