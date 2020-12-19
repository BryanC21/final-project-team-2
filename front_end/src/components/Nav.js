import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { logoutUser } from '../redux/actions/userActions';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.user.email);
  return (
    <Navbar style={{ background: 'gainsboro' }}>
      <Nav className='ml-auto'>
        <Nav.Link href='/'>Home</Nav.Link>
        {userEmail ? (
          <>
            <Nav.Link href='/Admin'>Admin</Nav.Link>
            <Nav.Link
              onClick={() => {
                Cookies.remove('userEmail');
                Cookies.remove('isAdmin');
                Cookies.remove('userId');
                Cookies.remove('isLoggedIn');
                dispatch(logoutUser());
              }}
            >
              Log Out
            </Nav.Link>
            <Nav.Link>Logged in as: {userEmail}</Nav.Link>
          </>
        ) : (
          <>
            <Nav.Link href='/Signup'>Sign Up</Nav.Link>
            <Nav.Link href='/LogIn'>Log in</Nav.Link>
          </>
        )}
      </Nav>
    </Navbar>
    // <nav>
    //   <Link to ='/'>Home</Link>
    //   {userEmail ? (
    //       <>
    //       <Link to ='/Admin'>Admin</Link>
    //       <button onClick={() => {
    //         Cookies.remove('userEmail')
    //         Cookies.remove('isAdmin')
    //         Cookies.remove('userId')
    //         Cookies.remove('isLoggedIn')
    //         dispatch(logoutUser())
    //       }}>Log Out </button>
    //       <div>
    //         Logged in as: {userEmail}
    //       </div>
    //       </>
    //   ):(
    //     <>
    //     <Link to ='/Signup'>Sign Up</Link>
    //     <Link to ='/LogIn'>Log In</Link>
    //     </>
    //   )}
    // </nav>
  );
};

export default NavBar;
