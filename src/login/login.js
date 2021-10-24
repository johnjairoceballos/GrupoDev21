import React, { Component } from "react";
import "./login.css";
import { useState } from "react";
import GoogleLogin from "react-google-login";
import Bienvenida from "../bienvenida/bienvenida";
import axios from "axios";
import Swal from 'sweetalert2'




function Login(props) {

  let [isLoggedIn, setIsLoggedIn] = useState(false);


  const repuestaGoogle = async (respuesta) => {
    // debugger;
    console.log(respuesta);
    console.log(respuesta.profileObj);
    

    const email = respuesta.profileObj.email;
    const res = await axios.get("http://localhost:4000/api/users/correo/" + email)
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
      console.log(res.json);
    
      console.log(nombre);
      sessionStorage.setItem('nombre', nombre);
      sessionStorage.setItem('rol', rol);
      
    }
  }

  const respuestaFallidaGoogle = (respuesta) => {
    console.error(respuesta);
  }

  const renderizacion = () => {

    if (!isLoggedIn) {
      return (
        <main>
          <form>
            <section className="form-login">
              <h5>Bienvenido</h5>
              <GoogleLogin
                clientId="385618110845-3enrrlu686p786q2mnn0fnib099tn4kt.apps.googleusercontent.com"
                buttonText="Iniciar Sesión"
                onSuccess={repuestaGoogle}
                onFailure={respuestaFallidaGoogle}
                cookiePolicy={"single_host_origin"}
              />

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
