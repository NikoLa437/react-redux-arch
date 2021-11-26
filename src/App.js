import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom'
import { ROUTES } from './constants';
import HomePage from './components/homePage';
import { ConnectedRouter } from "connected-react-router";
import SignInPage from './components/singIn';
import history from './utils/history';

function App() {
    // o ovom connected router nista ne morate da znate, msm konfigurisan je dobro i mozemo rutirati sa push
    // videcete to negde komentarisano vec
    // ROUTER.HOME_PAGE su konstante za route, msm dobra je praksa tako raditi, kontam dobicemo neki + 
    // jer ako izmenis neku rutu morao bi svuda u kodu da juris, ovako samo u const fajlu
    // sve ostalo je ovde jasno
    return(
        <ConnectedRouter history={history}>
            <Switch>
                <Route exact path={ROUTES.HOME_PAGE} component={HomePage} />
                <Route exact path={ROUTES.SIGNIN} component={SignInPage} />
            </Switch>
        </ConnectedRouter>
    );
}

export default App;
