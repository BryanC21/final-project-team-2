import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import {logoutUser} from '../redux/actions/userActions';
import {Link} from 'react-router-dom'


const Nav = () => {
const dispatch = useDispatch();
    const userEmail = useSelector(state => state.user.email);
    return (
        <nav>
          <Link to ='/'>Home</Link>
          {userEmail ? (
              <>  
              <Link to ='/Admin'>Admin</Link> 
              <button onClick={() => {
                Cookies.remove('userEmail')
                Cookies.remove('isAdmin')
                Cookies.remove('userId')
                Cookies.remove('isLoggedIn')
                dispatch(logoutUser())
              }}>Log Out </button>
              <div>
                Logged in as: {userEmail}
              </div>
              </>
          ):(
            <>
            <Link to ='/Signup'>Sign Up</Link>
            <Link to ='/LogIn'>Log In</Link>
            </>
          )}
        </nav>
    );
};

export default Nav;