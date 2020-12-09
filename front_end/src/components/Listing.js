// todo add image here maybe?
import React from 'react';
import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';
import { setInquiry } from '../redux/actions/inquiryActions';

const Listing = (props) => {
  const dispatch = useDispatch();
  const [stateInquiry, setStateInquiry] = React.useState('');
  //const test = useSelector(state => state.inquiryReducer.inquiries);
  const userId = useSelector((state) => state.user.userId);
  //console.log(props);

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
  const handleView = () => {
    axios
      .get(`/api/getInquiries?listingId=${props.listing._id}`)
      .then(function (response) {
        //console.log(response.data.inquiries)
        dispatch(setInquiry(response.data.inquiries));
        //console.log(test)
        //console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const handleSubmit = () => {
    axios
      .post(`/api/makeInquiry`, {
        message: stateInquiry,
        listingId: props.listing._id,
        userId: userId,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <table className='listing'>
        <tbody>
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
              <th>
                <button onClick={handleView}>View Inquiries</button>
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
