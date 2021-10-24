import React, { Component } from "react";
import "./login.css";
import { useState } from "react";
import GoogleLogin from "react-google-login";
import Bienvenida from "../bienvenida/bienvenida";
import axios from "axios";
import Swal from 'sweetalert2'
import { alignPropType } from "react-bootstrap/esm/types";




function Login(props) {

  let [isLoggedIn, setIsLoggedIn] = useState(false);

  const divStyle = {
    align: 'center',  
  };


  const repuestaGoogle = async (respuesta) => {
    // debugger;
    console.log(respuesta);
    console.log(respuesta.profileObj);


    const email = respuesta.profileObj.email;
    const res = await axios.get("http://localhost:3001/api/v1/user/email/" + email);
    if (res.data.length === 0) {
      setIsLoggedIn(false);
      Swal.fire({
        icon: 'error',
        title: 'Usuario no encontrado',
        showConfirmButton: false,
        timer: 1500
      })

    } else {
      setIsLoggedIn(true);
      Swal.fire({
        icon: 'success',
        title: 'Bienvenido',
        showConfirmButton: false,
        timer: 1500
      })
      const nombre = respuesta.profileObj.name;
      const token = respuesta.profileObj.token;
      console.log(res.json);

      console.log(nombre);
      sessionStorage.setItem('nombre', nombre);
      sessionStorage.setItem('token' ,  token );
      // sessionStorage.setItem('rol', rol);

    }
  }

  const respuestaFallidaGoogle = (respuesta) => {
    console.error(respuesta)
  }

  const renderizacion = () => {

    if (!isLoggedIn) {
      return (
        <main>
          <form>

            <section className="form-login">

              <img class="avatar" src="./logo7.png" alt="" />
              <h5>Bienvenido</h5>

              <div class="form-group" id="user">

                <input
                  class="controls" type="text" name="usuario" value="" placeholder="correo" />
              </div>
              <div class="form-group" id="password">
                <input
                  class="controls" type="password" name="contrasena" value="" placeholder=" Contraseña" />
              </div>
              <input
                class="buttons" type="submit" name="" value="   Ingresar" />
              <p><a href="#">¿Olvidaste tu contraseña?</a></p>
              <div className="offset-md-3">
                <GoogleLogin
                  clientId="385618110845-3enrrlu686p786q2mnn0fnib099tn4kt.apps.googleusercontent.com"
                  buttonText="Iniciar Sesión"
                  onSuccess={repuestaGoogle}
                  onFailure={respuestaFallidaGoogle}
                  cookiePolicy={"single_host_origin"}
                />
              </div>
            </section>
          </form>
        </main>
      );
    } else {
      return (<Bienvenida ></Bienvenida>)
    }
  }

  return (
    renderizacion()
  );



}

export default Login;
