// todo add image here maybe?
import React from 'react';
import axios from 'axios';
import './listingForm.css';

import { useSelector, useDispatch } from 'react-redux';
import {
  setDescription,
  setType,
  setPrice,
  setTitle,
  setListings,
} from '../redux/actions/listingActions';

const ListingCreationForm = () => {
  const dispatch = useDispatch();
  const description = useSelector((state) => state.listing.description);
  const type = useSelector((state) => state.listing.type);
  const price = useSelector((state) => state.listing.price);
  const title = useSelector((state) => state.listing.title);
  const userId = useSelector((state) => state.user.userId);
  const [imgData, setData] = React.useState();

  const imageUpload = () => {
    const formData = new FormData();

    formData.append('file', imgData, imgData.name);
    axios.post('upload', formData);
  };

  const handleListingSubmit = async () => {
    await axios
      .post('/api/createListing', {
        description: description,
        type: type,
        price: price,
        title: title,
        userId: userId,
      })
      .then(function (response) {
        console.log(response);
        dispatch(setDescription(''))
        dispatch(setType(''))
        dispatch(setPrice(''))
        dispatch(setTitle(''))
      })
      .catch(function (error) {
        console.log(error);
        alert('Error creating listing')
      });
    axios
      .get(`/api/viewListings?userId=${userId}`)
      .then(function (response) {
        dispatch(setListings(response.data.listings));
        //console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div className='Listing'>
      <div className='ListingForm'>
        <table>
          <tr>
            <th>Description:</th>
            <th>
              <textarea
                id='input-description'
                value={description}
                onChange={(e) => dispatch(setDescription(e.target.value))}
              />
            </th>
          </tr>
          <tr>
            <th>Type:</th>
            <th>
              <input
                id='input-type'
                value={type}
                onChange={(e) => dispatch(setType(e.target.value))}
              />
            </th>
          </tr>
          <tr>
            <th>Price:</th>
            <th>
              <input
                id='input-price'
                value={price}
                onChange={(e) => dispatch(setPrice(e.target.value))}
              />
            </th>
          </tr>
          <tr>
            <th>Title:</th>
            <th>
              <input
                id='input-title'
                value={title}
                onChange={(e) => dispatch(setTitle(e.target.value))}
              />
            </th>
          </tr>
          <tr>
            <th>Upload an image:</th>
            <th>
              <input type='file' onChange={(e) => setData(e.target.files[0])} />
              <button
                onClick={
                  console.log('send to kafka')
                  // imageUpload
                }
              >
                Upload
              </button>
            </th>
          </tr>
          <tr style={{width: 100 + "%"}}>
            <th style={{textAlign: 'right'}}>
              <button id='submit' onClick={handleListingSubmit}>
                Submit Listing
              </button>
            </th>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default ListingCreationForm;
