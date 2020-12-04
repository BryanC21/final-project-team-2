// todoconst initState = () => ({
const initState = () => ({
    description: '',
    type: '',
    price: '',
    title: '',
    listings: [],
});


const listingReducer = (state = initState(), action) => {
    //console.log(action)
    switch (action.type) {
        case 'DESCRIPTION_SET':
            return {
                ...state, // copy old state
                description: action.description, // input the new user name
            };
        case 'TYPE_SET':
            return {
                ...state,
                type: action.itemType,
            };
        case 'PRICE_SET':
            return {
                ...state,
                price: action.price,
            };
        case 'TITLE_SET':
            return {
                ...state,
                title: action.title,
            };
        case 'LISTINGS_SET':
            return {
                ...state,
                listings: action.listings
            }
        default:
            // we don't want to modify state, ignore action
            return state;
    }
};

export default listingReducer;
