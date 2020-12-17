import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';
import { setListings } from '../redux/actions/listingActions';
import Listing from './Listing';
import {setRefreshListingWS} from '../websockets'

const ViewListings = (props) => {
  const dispatch = useDispatch();
  const listings = useSelector((state) => state.listing.listings);
  const userId = useSelector((state) => state.user.userId);

  //this state is to forceupdate the listing when client recieves a update listing message from WS
  const [refreshListing, setRefreshListing] = useState(false); 
  //console.log(listings);
  useEffect(() => {
    setRefreshListingWS(setRefreshListing)
  },[])
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
        setRefreshListing(false)
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [refreshListing]);

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
