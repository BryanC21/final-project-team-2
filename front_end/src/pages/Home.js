// todo
import React from 'react';
import ViewListings from '../components/ViewListings';

const Home = () => {
  return (
    <div>
      <center>
        <h1>Home</h1>
      </center>
      <ViewListings userMode={true} />
    </div>
  );
};

export default Home;
