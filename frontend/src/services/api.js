const api = {}

const backend = 'http://18.216.47.154:8000/'
const signupUrl = `${backend}signup/`
const signinUrl = `${backend}signin/`
const userUrl = `${backend}user/`

api.signup = (user) => {
	let headers = {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	}
	let body = JSON.stringify(user)

	return fetch(signupUrl, {headers, method: "POST", body})
		.then(res => {
			console.log(res)
			return {
				status: res.status
			}
		})
}

api.signin = (user) => {
	let headers = {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	}
	let body = JSON.stringify(user)
	console.log(body)
	return fetch(signinUrl, {headers, method: "POST", body})
		.then(res => {
			if(res.status === 200) {
				return res.json().then(data => {
					return {
						status: res.status,
						data: data
					}
				})
			}
			else {
				return {
					status: res.status
				}
			}
		})
}

api.userSet = (token) => {
	let headers = {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		'Authorization': `Token ${token}`
	}
	return fetch(userUrl, {headers, method: "GET"})
		.then(res => {
			if(res.status >= 400) {
				return {
					status: res.status
				}
			}
			else {
				return res.json().then(data => {
					return {
						status: res.status,
						id: data.id,
						nickname: data.nickname
					}
				})
			}
		})
}

api.userGet = (id) => {
	let headers = {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	}

	return fetch(`${userUrl}${id}/`, {headers, method: "GET"})
		.then(res => {
			if(res.status >= 400) {
				return {
					status: res.status
				}
			}
			else {
				return res.json().then(data => {
					return {
						status: res.status,
						data: data
					}
				})
			}
		})
}

function request(url, headers, body) {
	let options;
	if(body === undefined) {
		console.log(headers)
		return fetch(url, headers)
			.then(res => {
				if(res.status >= 500) {
					console.log("Internal error: " + res.status)
					return {
						status: res.status
					}
				}
				else if(res.status >= 400) {
					console.log("Request error: " + res.status)
					return {
						status: res.status
					}
				}
				else if(res.status === 204) {
					return {
						status: res.status
					}
				}
				else {
					//console.log(res)
						return {
							status: res.status,
						}

				}
			})
	}
	else {
		console.log({headers, body})
		return fetch(url, {headers, body})
			.then(res => {
				if(res.status >= 500) {
					console.log("Internal error: " + res.status)
					return {
						status: res.status
					}
				}
				else if(res.status >= 400) {
					console.log("Request error: " + res.status)
					return {
						status: res.status
					}
				}
				else if(res.status === 204) {
					return {
						status: res.status
					}
				}
				else {
					return res.json().then(data => {
						return {
							status: res.status,
							data: data
						}
					})
				}
			})
	}
}

api.get = (url, token) => {
	let headers = {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	}

	if(token) {
		headers = {...headers, 'Authorization': `Token ${token}`}
	}
	return request(url, {headers, method: "GET"})
}

	/*
api.post = (url, data, token) => {
	let headers = {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		'Authorization': `Token ${token}`
	}
	let body = JSON.stringify(data)

	return request(url, {headers, method: "POST"}, body)
}
*/

api.post = (url, data, token) => {
	let headers = {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		'Authorization': `Token ${token}`
	}
	let body = JSON.stringify(data)

	return fetch(url, {headers, method: "POST", body})
		.then(res => {
			if(res.status >= 500) {
				console.log("Internal error: " + res.status)
				return {
					status: res.status
				}
			}
			else if(res.status >= 400) {
				console.log("Request error: " + res.status)
				return {
					status: res.status
				}
			}
			else {

				return res.json().then(data => {
					return {
						status: res.status,
						data: data
					}
				})
			}
		})
}

api.put = (url, data, token) => {
	let headers = {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		'Authorization': `Token ${token}`
	}
	let body = JSON.stringify(data)

	return request(url, {headers, method: "PUT", body})
}

api.delete = (url, token) => {
	let headers = {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		'Authorization': `Token ${token}`
	}


	return request(url, {headers, method: "DELETE"})
}

export default api
