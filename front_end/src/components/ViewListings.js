import React, { useEffect } from 'react';
import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';
import { setListings } from '../redux/actions/listingActions';
import Listing from './Listing';

const ViewListings = (props) => {
  const dispatch = useDispatch();
  const listings = useSelector((state) => state.listing.listings);
  const userId = useSelector((state) => state.user.userId);
  //console.log(listings);
  useEffect(() => {
    let apiRoute = '/api/viewListings';
    if (!props.userMode) {
      apiRoute += `?userId=${userId}`;
    }
    axios
      .get(apiRoute)
      .then(function (response) {
        dispatch(setListings(response.data.listings));
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const createListingsElements = (listing) => {
    return <Listing listing={listing} userMode={props.userMode} />;
  };

  return (
    <div>
      <h1>{props.userMode ? <>All Listings</> : <>Your Listings</>}</h1>
      {listings.map((items) => createListingsElements(items))}
    </div>
  );
};

export default ViewListings;
