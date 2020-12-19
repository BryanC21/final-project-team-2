// todo add image here maybe?
import React from 'react';
import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';
import { setInquiry } from '../redux/actions/inquiryActions';

const Listing = (props) => {
  //const imageLink = "../uploads/500x500"+props.listing.imageId+".png";
  //console.log("-------------------------"+imageLink);
  /*try{
    const img = require(imageLink);
    console.log('found image');
  } catch(err){
    console.log(err);
    console.log('processing image');
  }*/
  const dispatch = useDispatch();
  const [stateInquiry, setStateInquiry] = React.useState('');
  //const test = useSelector(state => state.inquiryReducer.inquiries);
  const userId = useSelector((state) => state.user.userId);
  //console.log(props);

  const [imageURL, setImageURL] = React.useState("https://csc667group2.s3.amazonaws.com/100x100"+props.listing.imageId+".png");
  const [isBig, setBig] = React.useState(false);
  console.log(imageURL);

  const toggleSize = () => {
    if(isBig){
      setImageURL("https://csc667group2.s3.amazonaws.com/100x100"+props.listing.imageId+".png");
      setBig(false);
    } else {
      setImageURL("https://csc667group2.s3.amazonaws.com/500x500"+props.listing.imageId+".png");
      setBig(true);
    }
  }

  const handleDelete = () => {
    if (userId === props.listing.userId) {
      axios.get(`/api/deleteListing?id=${props.listing._id}`);
      console.log('delete was clicked');
    } else {
      console.log('userId does not match');
    }
    /*axios.get('/api/viewListings')
          .then(function (response) {
            dispatch(setListings(response.data.items))
            //console.log(response);
          })
          .catch(function (error) {
            //console.log(error);
          });*/
  };

  const handleSubmit = () => {
    axios
      .post(`/api/makeInquiry`, {
        message: stateInquiry,
        listingId: props.listing._id,
        userId: userId,
        fromOwner: false
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });//<img src={process.env.PUBLIC_URL + '/uploads/100x100'+props.listing.imageId+'.png'} alt="processing" />
  };

  return (
    <div>
      <table className='listing'>
        <tbody>
          <tr>
            <th>Image:</th>
            <th><img src={imageURL} alt="processing"/></th>
            <th><button onClick={toggleSize}>Toggle Image Size</button></th>
          </tr>
          <tr>
            <th>Description:</th>
            <th>{props.listing.description}</th>
          </tr>
          <tr>
            <th>Type:</th>
            <th>{props.listing.type}</th>
          </tr>
          <tr>
            <th>Price:</th>
            <th>${props.listing.price}</th>
          </tr>
          <tr>
            <th>Title:</th>
            <th>{props.listing.title}</th>
          </tr>
        </tbody>
      </table>
      {!props.userMode && (
        <table>
          <tbody>
            <tr>
              <th>
                <button onClick={handleDelete}>Delete</button>
              </th>
            </tr>
          </tbody>
        </table>
      )}
      {props.userMode && (
        <table>
          <tbody>
            <tr>
              <th>
                <textarea
                  id='inquiry'
                  value={stateInquiry}
                  onChange={(e) => setStateInquiry(e.target.value)}
                />
              </th>
              <th>
                <button className='submit' onClick={handleSubmit}>
                  Submit
                </button>
              </th>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Listing;
