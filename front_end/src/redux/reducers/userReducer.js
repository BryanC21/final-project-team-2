import Cookies from 'js-cookie'

const initState = () => ({
    email: Cookies.get('userEmail') || null,
    isAdmin: Cookies.get('isAdmin') || false,
    userId: Cookies.get('userId') || null
})

const userReducer = (state = initState(), action) => {
    switch (action.type) {
        case 'USER_SET':
            return {
                ...state,
                email: action.email,
                isAdmin: action.isAdmin,
                userId: action.userId
            }
        case 'USER_LOGOUT':
            return {
                ...state,
                email: null,
                isAdmin: false,
                userId: null
            }
        default:
            // we don't want to modify state, ignore action
            return state;
    }
};


export default userReducer;
