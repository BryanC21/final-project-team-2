// todo
import React from 'react';

import { useSelector } from 'react-redux';


const Inquiries = () => {

    const inquiry = useSelector(state => state.inquiryReducer.inquiries);
    //console.log(inquiry)
    const displayInquiry = (inquiry, id) => {
        //console.log(inquiry)
        return (
            <div className="inquiry" key={id}>{inquiry}</div>
        );
    };

    return (
        <div>
            {inquiry.map((inquiries, num) => displayInquiry(inquiries.msg, num))}
        </div>
    );
};

export default Inquiries;