import React, { useEffect } from 'react';
import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';
import { setListings } from '../redux/actions/listingActions';
import Listing from './Listing';

const ViewListings = (props) => {

    const dispatch = useDispatch();
    const listings = useSelector(state => state.listing.listings);
    console.log(listings);
    useEffect(() => {
        axios.get('/api/viewListings')
            .then(function (response) {
                dispatch(setListings(response.data.items));
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    const createListingsElements = (listing) => {
        return (
            <Listing
                listing={listing}
                userMode={props.userMode}
            />
        );
    };

    return (
        <div>
            <h1>ViewListings</h1>
            {listings.map(items => createListingsElements(items))}
        </div>
    );
};

export default ViewListings;