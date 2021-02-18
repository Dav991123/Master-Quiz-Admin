import React, { useReducer } from 'react';
import LoginPage from './pages/login';
import { reducers } from '../reducers';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import AdminContext from '../context/adminContext';
import IsNotAuthLayer from '../routing/layers/IsNotAuthLayer';
import IsAuthLayer from '../routing/layers/isAuthLayer';
import defineGuards from '../routing/defineGuards';
import App from './app';
import { SnackbarProvider } from 'notistack';
import Splash from './components/global/splash';

const AppWrapper = () => {
    const initialState = {
        isAuth: false,
    };

    const [state, dispatch] = useReducer(reducers, initialState);
    
    return (
        <SnackbarProvider maxSnack={3}>
            <AdminContext.Provider value={{state, dispatch}}>
                <BrowserRouter>    
                    <Splash>
                        <Switch>
                            <Route exact path='/login' render={props => defineGuards([IsNotAuthLayer], LoginPage, props)}/>
                            <Route path='/' render={props => defineGuards([IsAuthLayer], App, props)}/>
                        </Switch>
                    </Splash>
                </BrowserRouter>
            </AdminContext.Provider>
        </SnackbarProvider>
    )
};
export default AppWrapper;