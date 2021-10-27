import React from 'react';
import { PublicRoute } from './helperRoutes';
import { Switch, Redirect, Route } from 'react-router-dom';
import Login from "../login/login";
import Bienvenida from '../bienvenida/bienvenida';

const PublicRoutes = () =>{
    return(
        <Switch>
            <PublicRoute exact path ="/" component={Login}/>
            {/* <PublicRoute exact path="/welcome" component={Bienvenida}/> */}
            {/* <Route exact path="*" render={()=>{
                return <Redirect to="/" />
            }} /> */}
            
        
        </Switch>
    )
}

export default PublicRoutes;