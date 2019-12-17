import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogin } from './utils/index';

const PrivateRoute = ({component: Component, ...rest}) => {

    return (

        // Muestra el component solo si el usuario esta logueado
        // sino, redirecciona el usuario a pagina de login
        <Route {...rest} render={props => (
            isLogin() ?
                <Component {...props} />
            : <Redirect to="/signin" />
        )} />
    );
};

export default PrivateRoute;