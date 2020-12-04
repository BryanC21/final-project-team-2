// todo
const initState = () => ({
    inquiries: [],
})

const inquiryReducer = (state = initState(), action) => {
    //console.log(action)
    //console.log(action.inquiryList)
    switch (action.type) {
        case 'INQUIRY_SET':
            //console.log(action.inquiryList)
            return {
                ...state,
                inquiries: action.inquiryList
            }
        default:
            // we don't want to modify state, ignore action
            return state;
    }
};


export default inquiryReducer;
