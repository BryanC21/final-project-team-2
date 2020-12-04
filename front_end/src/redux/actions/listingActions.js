// todo add image here maybe?
export const setDescription = (description) => ({
    type: 'DESCRIPTION_SET',
    description,
});
export const setType = (itemType) => ({
    type: 'TYPE_SET',
    itemType,
});
export const setPrice = (price) => ({
    type: 'PRICE_SET',
    price,
});
export const setTitle = (title) => ({
    type: 'TITLE_SET',
    title,
});
export const setListings = (listings) => ({
    type: 'LISTINGS_SET',
    listings,
});