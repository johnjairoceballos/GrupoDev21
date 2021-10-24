import logo from "./logo.svg";
import "./App.css";
import Menu from "./menu/menu";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./login/login";
import Usuarios from "./usuarios/usuarios";
import Productos from "./productos/productos";
import Bienvenida from "./bienvenida/bienvenida";
import GoogleLogin from "react-google-login";

function App() {



  return (
    <>
      <Router>
        <Route exact path="/" component={Login}></Route>
        <Route path="/welcome" component={Bienvenida}></Route>
        <Route path="/usuarios" component={Usuarios}></Route>
        <Route path="/productos" component={Productos}></Route>
        {/* <Route path="/edit/:id" component={Usuarios}></Route>
        <Route path="/create" component={Usuarios}></Route> */}
        {/* <Login></Login> */}
        {/* <Usuarios></Usuarios> */}
      </Router>

      <div className="App">
       
      </div>
    </>
  );
}

export default App;
