import React, {useRef} from 'react';
import {setUser} from '../redux/actions/userActions'
import {useDispatch} from 'react-redux'
import Cookies from 'js-cookie'

//page for Signup at /Signup 
const SignUp = ({history}) => {
    const dispatch = useDispatch()
    const emailRef = useRef()
    const passwordRef = useRef()
    return (
        <div>
            <h1>Sign Up</h1>
            <label for="email">Email</label>
            <input ref={emailRef} id="email" type="text" />
            <label for="password">Password</label>
            <input ref={passwordRef} id="password" type="password" />
            <button onClick={async () => {
                //checks that @ is in the emailRef and passwordRef has to be over 4 in length 
                if (emailRef.current.value.match(/@/) && passwordRef.current.value.length > 4){
                    const tempId = (Date.now().toString(35) + Math.random().toString(36).substring(2)).substring(7,15);
                    console.log(tempId)
                    await fetch('http://localhost:4000/user', {
                        method: 'POST', 
                        headers: {'Content-Type': 'application/json'},
                        mode: 'cors',
                        body: JSON.stringify({
                            email: emailRef.current.value,
                            password: passwordRef.current.value,
                            userId: tempId
                        })
                    })
                    //after signing up with valid email and password sends user back to homepage
                    dispatch(setUser(emailRef.current.value))
                    Cookies.set('userEmail', emailRef.current.value)
                    Cookies.set('isAdmin', true)
                    Cookies.set('userId', tempId)
                    history.push('/') 
                }else{
                    alert('Something is wrong')
                }
            }}>Submit</button>
        </div>
    );
};

export default SignUp;