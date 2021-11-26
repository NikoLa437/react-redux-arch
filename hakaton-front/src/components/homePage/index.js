import React from 'react'
import { useDispatch } from 'react-redux';
import { signOut } from '../../store/app/actions';

const HomePage = () =>{
    const dispatch = useDispatch()

    const handleSignOut = () => {
        // zovemo dispatch akcije signOut, ona ima type SIGN_OUT_REQUEST, a u sagi smo definisali da sign out request
        // poziva funkciju signOut
        dispatch(signOut())
    }

    return (
        <React.Fragment>
            <h1>
                Hello home pages
                <button onClick={() => handleSignOut()}>Sign out button</button>
            </h1>
        </React.Fragment>
    );
}
  
export default HomePage;
  