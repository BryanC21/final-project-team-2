// todo
import React from 'react';
import axios from 'axios';

import { useDispatch } from 'react-redux';
import { setInquiry } from '../redux/actions/inquiryActions';

const Listing = (props) => {

    const dispatch = useDispatch();
    const [stateInquiry, setStateInquiry] = React.useState('');
    //const test = useSelector(state => state.inquiryReducer.inquiries);

    const handleDelete = () => {
        axios.get(`/api/deleteListing?id=${props.listing.id}`);
        console.log('delete was clicked');
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
        axios.get(`/api/getInquiries?listingId=${props.listing.id}`)
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
        axios.post(`/api/makeInquiry?listingId=${props.listing.id}`, {
            message: stateInquiry
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    return (
        <div key={Math.random()}>
            <table className="listing">
                <tbody>
                    <tr>
                        <td>Description:
              <div>{props.listing.description}</div>
                        </td>
                    </tr>
                    <tr>
                        <td>Type:
              <div>{props.listing.type}</div>
                        </td>
                    </tr>
                    <tr>
                        <td>Price:$
              <div>{props.listing.price}</div>
                        </td>
                    </tr>
                    <tr>
                        <td>Title:
              <div>{props.listing.title}</div>
                        </td>
                    </tr>
                </tbody>
            </table>
            {!props.userMode && (
                <div>
                    <button onClick={handleDelete}>Delete</button>
                    <button onClick={handleView}>View Inquiries</button>
                </div>
            )}
            {props.userMode && (
                <div>
                    <textarea id="inquiry" value={stateInquiry}
                        onChange={(e) => setStateInquiry(e.target.value)}
                    />
                    <button className="submit" key={Math.random()} onClick={handleSubmit}>Submit</button>
                </div>
            )}
        </div >
    );
};

export default Listing;