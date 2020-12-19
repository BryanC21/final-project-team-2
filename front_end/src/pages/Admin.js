// todo
import React from 'react';
import ViewListings from '../components/ViewListings';
import ListingCreationForm from '../components/ListingCreationForm';
import Chats from '../components/Chats';




const Admin = () => {
    return (
      <div>
        <center>
          <h1>Admin</h1>
        </center>
        <ListingCreationForm />
        <ViewListings userMode={false} />
        <Chats />
      </div>
    );
};

export default Admin;