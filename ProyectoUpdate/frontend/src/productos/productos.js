import React, { Component } from "react";
// import "./login.css";
import "./productos.css";
import "./general.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from "react-bootstrap";
import Menu from "./../menu/menu";
import axios from "axios";

class Productos extends Component {
  state = {
    users: [],
    username: "",
  };

  getUsers = async () => {
    const res = await axios.get("http://localhost:4000/api/products");
    this.setState({ users: res.data });
  };

  async componentDidMount() {
    this.getUsers();
    console.log(this.state.users);
  }

  onChangeUsername = (e) => {
    // console.log(e.target.value);
    this.setState({
      username: e.target.value,
    });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:4000/api/users", {
      username: this.state.username,
    });
    console.log(res);
    this.getUsers();
    this.setState({ username: "" });
  };

  deleteUser = async (id) => {
    console.log(id);
    await axios.delete("http://localhost:4000/api/users/" + id);
    this.getUsers();
  };

  render() {
    return (
      
      <main>
        <Menu></Menu>
        <h2>Registrar Productos</h2>
        {/* <article className="col-sm-12"> */}
        <div className="card-group">
          <div className="card col-sm-7">
            {/* <!-- <img className="card-img-top" src="..." alt="Card image cap"> --> */}
            <div className="card-body">
              <form id="formProducto" method="" name="form_producto">
                <div className="mb-3">
                  <label for="iddescripcion">Descripción: </label>
                  <input
                    type="text"
                    className="form-control"
                    name="pd_desc"
                    id="iddescripcion"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label for="idprecio" className="form-label">
                    Precio:{" "}
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="idPrecio"
                    name="pd_valorUnitario"
                    aria-describedby="precioHelp"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label for="fotoProducto">Foto: </label>
                  <input
                    type="file"
                    className="form-control"
                    name="pd_foto"
                    id="idFotoProducto"
                  />
                </div>
                <div>
                  <div className="form-check">
                    <p>Disponibilidad del articulo</p>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="pd_estad"
                      id="idpd_estado"
                      value="0"
                      checked
                    />
                    <label className="form-check-label" for="idpd_estado">
                      No Disponible
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="pd_estad"
                      id="idpd_estado"
                      value="1"
                    />
                    <label className="form-check-label" for="idpd_estado">
                      Disponible
                    </label>
                  </div>
                </div>

                <br />
                <div className="container">
                  <button
                    type="reset"
                    className="btn btn-danger"
                    id="btnCancelar"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
              <div className="container">
                <button
                  type=""
                  className="btn btn-guardar btn-success"
                  onclick="agregarProducto()"
                >
                  Guardar{" "}
                </button>
              </div>
            </div>
          </div>
          <div className="card col-sm-5">
            <div className="card-header">
              <label for="busquedaProducto" className="buscar_producto">
                Buscar:{" "}
              </label>
              <input
                type="text"
                id="busquedaProducto"
                placeholder="Id o nombre del producto"
              />
            </div>
            {/* <!-- <img className="card-img-top" src="..." alt="Card image cap"> --> */}
            {/* <!--  Agregar a cada producto el boton de actualizar (abre otra ventana) y eliminar --> */}

            <div className="card-body">
              <table className="table table-responsive table-striped table-fixed">
                <thead className="table-primary">
                  <tr>
                    <th scope="col">Id</th>
                    <th id="descTable" scope="col">
                      Descripción
                    </th>
                    <th scope="col">Precio</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Gestionar</th>
                  </tr>
                </thead>
                <tbody id="productosTable"></tbody>
              </table>
            </div>
          </div>
        </div>
        {/* </article> */}
      </main>
    );
  }
}

export default Productos;
