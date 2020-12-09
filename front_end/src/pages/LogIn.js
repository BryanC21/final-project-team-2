import React, { useRef } from 'react';
import { setUser } from '../redux/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { Redirect } from 'react-router-dom';

const LogIn = ({ history }) => {
  const dispatch = useDispatch();
  const emailRef = useRef();
  const passwordRef = useRef();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
//   console.log(isLoggedIn);
    if (!isLoggedIn) {
        return (
            <div>
                <h1>Login</h1>
                <label for='email'>Email</label>
                <input ref={emailRef} id='email' type='text' />
                <label for='password'>Password</label>
                <input ref={passwordRef} id='password' type='password' />
                <button
                    onClick={async () => {
                        //checks that @ is in the emailRef and passwordRef has to be over 4 in length
                        if (
                            emailRef.current.value.match(/@/) &&
                            passwordRef.current.value.length > 4
                        ) {
                            const response = await fetch('http://localhost:4000/user/login', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                mode: 'cors',
                                body: JSON.stringify({
                                    email: emailRef.current.value,
                                    password: passwordRef.current.value,
                                }),
                            });
                            if (response.ok) {
                                const parsedRes = await response.json();
                                console.log(parsedRes);
                                //after signing up with valid email and password sends user back to homepage
                                dispatch(
                                    setUser(
                                        parsedRes.email,
                                        parsedRes.isAdmin,
                                        parsedRes.userId,
                                        true
                                    )
                                );
                                Cookies.set('userEmail', parsedRes.email);
                                Cookies.set('isAdmin', parsedRes.isAdmin);
                                Cookies.set('userId', parsedRes.userId);
                                Cookies.set('isLoggedIn', true);
                                history.push('/');
                            } else {
                                alert('Wrong login credentials');
                            }
                        } else {
                            alert('Something is wrong');
                        }
                    }}
                >
                    Submit
      </button>
            </div>
        );
    } else {
        return (
            <Redirect to = "/"/>
        )
    }
};

export default LogIn;
