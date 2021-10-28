import logo from "./logo.svg";
import "./App.css";
import Menu from "./menu/menu";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./login/login";
import Usuarios from "./usuarios/usuarios";
import Productos from "./productos/productos";
import Bienvenida from "./bienvenida/bienvenida";
import GoogleLogin from "react-google-login";
import PrivateRoute from "./routes/private.routes";
import AuthProvider from "./auth/AuthProvider";
import AppRouter from "./routes/AppRouter";

function App() {



  return (
    <>
      <AuthProvider>
        <AppRouter></AppRouter>
      </AuthProvider>
   

      <div className="App">

      </div>
    </>
  );
}

export default App;
