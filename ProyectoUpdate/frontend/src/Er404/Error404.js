import React from "react";
import "./Error404.css";
import blind from "./blind.png";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

function Error404() {
  return (
    <div>
      <section className="form-404">
        <div className="container">
          <div className="row rowError">
            <div className="blind col-md-6">
              <img src={blind} width="50%" height="100%" />
            </div>
            <div className="col-md-6">
              <h1>ERROR 404</h1>
              <p>Lo sentimos no encontramos esta pagina</p>
              {
                  <Link to="/">
                    <Button>Regresar a Login</Button>
                  </Link>
                  }
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Error404;
