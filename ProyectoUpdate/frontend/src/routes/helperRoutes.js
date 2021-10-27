import {Route, Redirect} from 'react-router-dom';
import { isAutenticated } from '../login/login';

export const PublicRoute = ({component, ...options}) => {
    const isAuth = isAutenticated;
    if(!isAuth) return <Route {...options} component={component}/>
    return <Redirect to="/" /> 
}


export const PivateRoute = ({component, ...options}) => {
    const isAuth = isAutenticated;
    if(isAuth) return <Route {...options} component={component}/>
    return <Redirect to="/welcome" /> 
}