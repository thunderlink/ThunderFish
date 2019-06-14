import '../actions/Notification'

export const initialState = {
    notification_list : null
}

export default function notification(state=initialState, action) {
    switch (action.type) {
        case "GET_NOTIFICATION":
            return{
                notification_list: action.notification_list,
            }

        default:
            return state;
    }
}
