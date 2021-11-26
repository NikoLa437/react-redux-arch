import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../../store/signIn/actions';
import { makeSignInError } from '../../store/signIn/selectors';

// ovo je tipa sign in page, i na handleSignIn bi slali samo dispatch na signIn iz actions.js
// on bi bkvl video da je type SIGN_IN_REQUEST a njega smo definisali u sagi da poziva loginUser
// sve ostalo je istorija :D
const SignInPage = () =>{
    const dispatch = useDispatch()

    //ovo je da uzima signInErorr value, na svaku promenu u reduceru error ce se promeniti
    //videcete dole kako da testirate ovo
    const error = useSelector(makeSignInError())
    
    const handleSingIn = () =>{
        dispatch(signIn('user','pw'))
    }

    return (
        <React.Fragment>
            <h1>
                {error}
                <button onClick={() => handleSingIn()}>Sign in</button>
            </h1>
        </React.Fragment>
    );
}
  
export default SignInPage;
  