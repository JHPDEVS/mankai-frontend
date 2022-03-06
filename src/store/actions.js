import { createAction } from 'redux-actions'

export const Logout = createAction("LOGOUT");
export const BoardUpdate = (data) => {
    return({
        type: 'BOARD_UPDATE',
        payload:data
    })
}