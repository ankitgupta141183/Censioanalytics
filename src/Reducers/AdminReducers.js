import AdminActionType from "../Actions/AdminAction/AdminActionType";

export default function AdminReducer(state = {
    DashBoardData: ""
}, action) {
    switch (action.type) {
        case AdminActionType.AdminDash:
            return {
                ...state,
                DashBoardData: action.res
            };
        default: return state
    }

} 