import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router';
import React from "react";

const PrivateRoute = (props) => {
    //use useSelector here, state 
    let isLoggedIn = true;

    React.useEffect(() => {
       //axios or fetch data here and set the state
    },[])

    if(isLoggedIn){
        return (
            <div>
                <Route path = {props.path} component = {props.component}/>
            </div>
        );
    }
    else{
        return (
            <Redirect to = "/Signup" />
        );
    }
};

export default PrivateRoute;