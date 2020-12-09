// todo
import React from 'react';

import ViewListings from '../components/ViewListings';
import ListingCreationForm from '../components/ListingCreationForm';
import Inquiries from '../components/Inquiries';

const Admin = () => {
    return (
      <div>
        <center>
          <h1>Admin</h1>
        </center>
        <ListingCreationForm />
        <Inquiries />
        <ViewListings userMode={false} />
      </div>
    );
};

export default Admin;