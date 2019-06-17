export const GET_NOTIFICATION_REQUEST = "GET_NOTIFICATION_REQUEST"
export const READ_NOTIFICATION_REQUEST = "READ_NOTIFICATION_REQUEST"
export const GET_NOTIFICATION = "GET_NOTIFICATION"
export const READ_NOTIFICATION = "READ_NOTIFICATION"

export const getNotificationRequest = (id) => {
	return {
		type: 'GET_NOTIFICATION_REQUEST',
		id
	}
}

export const readNotificationRequest = (id, uid) => {
	return {
		type: 'READ_NOTIFICATION_REQUEST',
		id,
		uid
	}
}

export const getNotification = (notification_list) => {
	return {
		type: 'GET_NOTIFICATION',
		notification_list
	}
}
