const api = {}

const backend = 'http://18.216.47.154:8000/'
const signupUrl = `${backend}signup/`
const signinUrl = `${backend}signin/`
const userUrl = `${backend}user/`
const kakaoUrl = `${backend}kakao/`

api.kakaologin = (object) => {

	let headers = {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	}
	let body = JSON.stringify(object)
	return fetch(kakaoUrl, {headers, method: "POST", body})
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

api.signup = (user) => {
	let headers = {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	}
	let body = JSON.stringify(user)

	return fetch(signupUrl, {headers, method: "POST", body})
		.then(res => {
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
						nickname: data.nickname,
						pic_url: data.pic_url,
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

function request(url, options) {
	return fetch(url, options)
		.then(res => {
			if(res.status >= 500) {
				return {
					status: res.status
				}
			}
			else if(res.status >= 400) {
				return {
					status: res.status
				}
			}
			else if(res.status === 204) {
				//delete
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
		'Authorization': `Token ${token}`,
		'Content-Type': 'application/json'
	}
	let body = JSON.stringify(data)

	return request(url, {headers, method: "POST", body})
}

api.put = (url, data, token) => {
	let headers = {
		'Authorization': `Token ${token}`,
		'Content-Type': 'application/json'	
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
