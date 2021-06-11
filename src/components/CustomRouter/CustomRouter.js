import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';




export function PublicRouter({ component: Component, restricted = false, ...rest }) {
    const { isLogin } = useContext(UserContext)
    return (
        <Route {...rest} render={props => (
            (isLogin && restricted) ?  //restricted==true thi dang nhap roi khong vao duoc login
                <Redirect to='/' />
                : <Component {...props} />
        )}>

        </Route>
    );
}


export function PrivateRoute({ component: Component, restricted = false, children, ...rest }) {

    const { isLogin } = useContext(UserContext)
    return (
        <Route {...rest} render={props => (
            isLogin ?
                children
                : <Redirect to="/register" />
        )}>
        </Route>
    );
}

export function PrivateRouteAdmin({ component: Component, restricted = false, children, ...rest }) {

    const { isLogin, isAdmin } = useContext(UserContext)
    console.log("aa", isAdmin)
    console.log("bb", isLogin)
    return (
        <Route {...rest} render={props => (
            (isAdmin) ?
                (children)
                : <Redirect to="/login" />
        )}>
        </Route>
    );
}

