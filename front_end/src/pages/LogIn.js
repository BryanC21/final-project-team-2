import React, {useRef} from 'react';
import {setUser} from '../redux/actions/userActions'
import {useDispatch} from 'react-redux'
import Cookies from 'js-cookie'


const LogIn = ({history}) => {
    const dispatch = useDispatch()
    const emailRef = useRef()
    const passwordRef = useRef()
    return (
        <div>
            <h1>Login</h1>
            <label for="email">Email</label>
            <input ref={emailRef} id="email" type="text" />
            <label for="password">Password</label>
            <input ref={passwordRef} id="password" type="password" />
            <button onClick={async () => {
                //checks that @ is in the emailRef and passwordRef has to be over 4 in length 
                if (emailRef.current.value.match(/@/) && passwordRef.current.value.length > 4){
                    const response = await fetch('http://localhost:4000/user/login', {
                        method: 'POST', 
                        headers: {'Content-Type': 'application/json'},
                        mode: 'cors',
                        body: JSON.stringify({
                            email: emailRef.current.value,
                            password: passwordRef.current.value
                        })
                    })
                    if (response.ok){
                    const parsedRes = await response.json()
                    console.log(parsedRes)
                        //after signing up with valid email and password sends user back to homepage
                    dispatch(setUser(parsedRes.email, parsedRes.isAdmin))
                    Cookies.set('userEmail', parsedRes.email)
                    Cookies.set('isAdmin', parsedRes.isAdmin)
                    history.push('/') 
                    }else {
                        alert('Wrong login credentials')
                    }
                }else{
                    alert('Something is wrong')
                }
            }}>Submit</button>
        </div>
    );
};

export default LogIn;