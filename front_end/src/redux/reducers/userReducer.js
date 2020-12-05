const initState = () => ({
    email: null,
})

const inquiryReducer = (state = initState(), action) => {
    switch (action.type) {
        case 'USER_SET':
            return {
                ...state,
                email: action.email
            }
        default:
            // we don't want to modify state, ignore action
            return state;
    }
};


export default inquiryReducer;
