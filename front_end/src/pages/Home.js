// todo
import React from 'react';
import ViewListings from '../components/ViewListings';

const Home = () => {
    return (
        <div>
            <h1>Home</h1>
            <ViewListings userMode={true} />
        </div>
    );
};

export default Home;