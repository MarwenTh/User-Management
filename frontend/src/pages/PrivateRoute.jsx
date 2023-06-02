import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from './signin';

const PrivateRoute = ({ element: Element, ...rest }) => {
    const { isLoggedIn } = useContext(AuthContext);

    return <Route {...rest} element={isLoggedIn ? <Element /> : <Navigate to="/signin" replace />} />;
};

export default PrivateRoute;
