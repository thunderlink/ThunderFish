export const GET_NOTIFICATION_REQUEST = "GET_NOTIFICATION_REQUEST"
export const READ_NOTIFICATION_REQUEST = "READ_NOTIFICATION_REQUEST"
export const GET_NOTIFICATION = "GET_NOTIFICATION"

export const getnotificationRequest = (id) => {
    return {
        type: 'GET_NOTIFICATION_REQUEST',
        id: id
    }
}

export const readnotificationRequest = (id, pid) => {
    return {
        type: 'READ_NOTIFICATION_REQUEST',
        id: id,
        pid: pid
    }
}

export const getnotification = (notification_list) => {
    return {
        type: 'GET_NOTIFICATION',
        notification_list : notification_list
    }
}
