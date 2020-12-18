import React, { useRef } from 'react';
import { setUser } from '../redux/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { Redirect } from 'react-router-dom';

//page for Signup at /Signup
const SignUp = ({ history }) => {
  const dispatch = useDispatch();
  const emailRef = useRef();
  const passwordRef = useRef();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  if (!isLoggedIn) {
    return (
      <div>
        <center>
          <h1>Sign Up</h1>
          <table>
            <tbody>
              <tr>
                <th>
                  <label for='email'>Email</label>
                </th>
                <th>
                  <input ref={emailRef} id='email' type='text' />
                </th>
              </tr>
              <tr>
                <th>
                  <label for='password'>Password</label>
                </th>
                <th>
                  <input ref={passwordRef} id='password' type='password' />
                </th>
              </tr>
              <tr>
                <th>
                  <button
                    onClick={async () => {
                      //checks that @ is in the emailRef and passwordRef has to be over 4 in length
                      if (
                        emailRef.current.value.match(/@/) &&
                        passwordRef.current.value.length > 4
                      ) {
                        const tempId = (
                          Date.now().toString(35) +
                          Math.random().toString(36).substring(2)
                        ).substring(7, 15);
                        console.log(tempId);
                        await fetch('/user', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          mode: 'cors',
                          body: JSON.stringify({
                            email: emailRef.current.value,
                            password: passwordRef.current.value,
                            userId: tempId,
                            isLoggedIn: true,
                          }),
                        });
                        //after signing up with valid email and password sends user back to homepage
                        dispatch(setUser(emailRef.current.value, true, tempId));
                        Cookies.set('userEmail', emailRef.current.value);
                        Cookies.set('isAdmin', true);
                        Cookies.set('userId', tempId);
                        Cookies.set('isLoggedIn', true);
                        history.push('/');
                      } else {
                        alert('Something is wrong');
                      }
                    }}
                  >
                    Submit
                  </button>
                </th>
              </tr>
            </tbody>
          </table>
        </center>
      </div>
    );
  } else {
    return <Redirect to='/' />;
  }
};

export default SignUp;
