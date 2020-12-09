// todo
import React from 'react';

import { useSelector } from 'react-redux';


const Inquiries = () => {

    const inquiry = useSelector(state => state.inquiry.inquiries);
    //console.log(inquiry)
    const displayInquiry = (inquiry, id) => {
        //console.log(inquiry)
        return (
            <div className="inquiry" key={id}>{inquiry}</div>
        );
    };

    return (
        <div>
            {inquiry.map((inquiries, num) => {
                //console.log( "Testing inquries " + inquiries.message);
                return displayInquiry(inquiries.message, num);
                })}
        </div>
    );
};

export default Inquiries;