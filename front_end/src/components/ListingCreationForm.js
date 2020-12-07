// todo add image here maybe?
import React from 'react';
import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';
import { setDescription, setType, setPrice, setTitle, setListings } from '../redux/actions/listingActions';

const ListingCreationForm = () => {

    const dispatch = useDispatch();
    const description = useSelector(state => state.listing.description);
    const type = useSelector(state => state.listing.type);
    const price = useSelector(state => state.listing.price);
    const title = useSelector(state => state.listing.title);
    const userId = useSelector(state => state.user.userId);

    const handleListingSubmit = () => {
        axios.post('/api/createListing', {
            description: description,
            type: type,
            price: price,
            title: title,
            id: (Date.now().toString(35) + Math.random().toString(36).substring(2)).substring(7,15),
            userId: userId
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        axios.get('/api/viewListings')
            .then(function (response) {
                dispatch(setListings(response.data.items));
                //console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    return (
        <div className="Listing">
            <div className="ListingForm">
                <p>Description:
          <textarea id="input-description" value={description}
                        onChange={(e) => dispatch(setDescription(e.target.value))}
                    />
                </p>
                <p>Type:
          <input id="input-type" value={type}
                        onChange={(e) => dispatch(setType(e.target.value))}
                    />
                </p>
                <p>Price:
          <input id="input-price" value={price}
                        onChange={(e) => dispatch(setPrice(e.target.value))}
                    />
                </p>
                <p>Title:
          <input id="input-title" value={title}
                        onChange={(e) => dispatch(setTitle(e.target.value))}
                    />
                </p>
            </div>
            <button id="submit" onClick={handleListingSubmit}>Submit Listing</button>
        </div>
    );
};

export default ListingCreationForm;
