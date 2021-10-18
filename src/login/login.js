import React, { Component } from "react";
import "./login.css";

class Login extends Component {
  render() {
    return (
      <main>
        <form>
          <section className="form-login">
            <h5>Bienvenido</h5>
            <input
              className="controls"
              type="text"
              name="usuario"
              value=""
              placeholder="Usuario"
            />
            <input
              className="controls"
              type="password"
              name="contrasena"
              value=""
              placeholder="Contraseña"
            />
            {/* <input className="buttons" type="submit" name="" value="Ingresar" /> */}
            <button type="button" className="btn btn-primary">
                  Ingresar
                </button>
            <p>
              <a href="#">¿Olvidaste tu contraseña?</a>
            </p>
          </section>
        </form>
      </main>
    );
  }
}

export default Login;
