import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Bienvenida from "../bienvenida/bienvenida";
import Error404 from "../Er404/Error404";
import Login from "../login/login";
import Productos from "../productos/productos";
import Usuarios from "../usuarios/usuarios";
import ventas from "../ventas/ventas";
import PrivateRoute from "./private.routes";

export default function AppRouter() {
  return (
    
      <Router>
        <Switch>
          <Route exact path="/" component={Login}></Route>          
          <PrivateRoute
            exact
            path="/usuarios"
            component={Usuarios}
          ></PrivateRoute>
          <PrivateRoute path="/productos" component={Productos}></PrivateRoute>
          <PrivateRoute path="/ventas" component={ventas}></PrivateRoute>
          <PrivateRoute path="/welcome" component={Bienvenida}></PrivateRoute>
          <Route path="*" component={Error404}></Route>
        </Switch>
      </Router>
    
  );
}
