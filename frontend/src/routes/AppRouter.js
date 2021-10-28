import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Bienvenida from "../bienvenida/bienvenida";
import Error404 from "../Er404/Error404";
import Login from "../login/login";
import Usuarios from "../usuarios/usuarios";
import Ventas from "../ventas/ventas";
import PrivateRoute from "./private.routes";
import Ventas_consult from "../ventas/ventas_consult";
import AppProducts from "../productos/productos";

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
          <PrivateRoute path="/productos" component={AppProducts}></PrivateRoute>
          <PrivateRoute path="/ventas" component={Ventas}></PrivateRoute>
          <PrivateRoute path="/welcome" component={Bienvenida}></PrivateRoute>
          <PrivateRoute exact path="/ventas_consult" component={Ventas_consult}></PrivateRoute>
          <Route path="*" component={Error404}></Route>
        </Switch>
      </Router>
    
  );
}
