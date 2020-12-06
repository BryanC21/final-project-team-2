import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router';
import React from "react";

const PrivateRoute = (props) => {
    //use useSelector here, state 
    const isAdmin = useSelector(state => state.user.isAdmin);
    // React.useEffect(() => {
    //    //axios or fetch data here and set the state
    // },[])
    if(isAdmin){
        return (
            <div>
                <Route path = {props.path} component = {props.component}/>
            </div>
        );
    }
    else{
        return (
            <Redirect to = "/LogIn" />
        );
    }
};

export default PrivateRoute;