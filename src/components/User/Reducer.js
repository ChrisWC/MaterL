export const user = (state={type:'test'}, action) => {
    switch (action.type) {
        case 'LOGIN_ATTEMPT':
            return Object.assign({}, state, {
                type:action.type,
                username:action.username,
                attempt:(state.attempt+1)
            })
        case 'LOGIN_SUCCESS':
            return Object.assign({}, state, {
                type:action.type,
                username:action.username,
            })
        case 'LOGIN_FAILED':
            return Object.assign({}, state, {
                type:action.type,
                username:action.username,
                attempt:(action.attempt+1)
            })
        default:
            return state
    }
}

export default user;
