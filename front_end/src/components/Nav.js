import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import {logoutUser} from '../redux/actions/userActions';
import {Link} from 'react-router-dom'


const Nav = () => {
const dispatch = useDispatch();
    const userEmail = useSelector(state => state.user.email);
    const isAdmin = useSelector(state => state.user.isAdmin);
    return (
        <nav>
          <Link to ='/'>Home</Link>
          {isAdmin && (
             <Link to ='/Admin'>Admin</Link> 
          )}
          {userEmail ? (
              <>  
              <button onClick={() => {
                Cookies.remove('userEmail')
                Cookies.remove('isAdmin')
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