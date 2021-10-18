import React, { Component } from "react";
// import "./login.css";
import "./usuarios.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from "react-bootstrap";
import Menu from "./../menu/menu";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Swal from 'sweetalert2'
import {Link} from 'react-router-dom'

class Usuarios extends Component {
  state = {
    users: [],
    username: "",
    userlastname: "",
    email: "",
    rol: "",
    estado: "",
    _id: "",
    isUpdate: false
  };

  getUsers = async () => {
    const res = await axios.get("http://localhost:4000/api/users");
    this.setState({ users: res.data });
    // console.log("users" + JSON.stringify(res));
    
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

  onChangeLastname = (e) => {
    console.log(e.target.value);
    this.setState({
      userlastname: e.target.value,
    });
  };

  onChangeEmail = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  onChangeEstado = (e) => {
    this.setState({
      estado: e.target.value,
    });
  };

  onChangeRol = (e) => {
    this.setState({
      // [e.targe.name]:e.target.value,  --este se utiliza como generico para poder utilizar un solo metodo
      rol: e.target.value,
    });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:4000/api/users", {
      username: this.state.username,
      userlastname: this.state.userlastname,
      email: this.state.email,
      rol: this.state.rol,
      estado: this.state.estado,
    });
    console.log(res);
    this.getUsers();
    this.setState({
      username: "",
      userlastname: "",
      email: "",
      rol: "0",
      estado: "0",
    });

    const mensaje = res.data.mensaje;
    Swal.fire({
          // position: 'top-end',
          icon: 'success',
          title: mensaje,
          showConfirmButton: false,
          timer: 1500
        })
    // alert(mensaje);
  };

  deleteUser = async (id) => {
    console.log(id);
    const res = await axios.delete("http://localhost:4000/api/users/" + id);
    this.getUsers();
    // const mensaje = res.data.mensaje;
  };

  confimarDelete(id){
    Swal.fire({
      title: 'Esta Seguro!!',
      text: "¿Quiere eliminar este usuario?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteUser(id);
        Swal.fire(
          '',
          'Usuario Eliminado',
          'success'
        )
      }
    })
  }

  getUser = async (id) =>{
    const res = await axios.get("http://localhost:4000/api/users/" + id);
    console.log("usuario " + JSON.stringify(res));
    this.setState({
      _id: res.data.user._id,
      username: res.data.user.username,
      userlastname: res.data.user.userlastname,
      email: res.data.user.email,
      rol: res.data.user.rol,
      estado: res.data.user.estado,
      isUpdate: true
    });
  console.log("isUp " + this.state.isUpdate);
  }

  updateUser= async (id) =>{
     const res = await axios.put("http://localhost:4000/api/users/" + id, {
        username: this.state.username,
        userlastname: this.state.userlastname,
        email: this.state.email,
        rol: this.state.rol,
        estado: this.state.estado,
     });
    //  this.getUsers();
    console.log(res.data.mensaje);
  }

  confirmUpdate = async (id)=>{
    Swal.fire({
      icon: 'success',
      title: 'Usuario Actualizado',
      showConfirmButton: false,
      timer: 1500
    })
    this.updateUser(id);
    this.getUsers();
    this.setState({
      username: "",
      userlastname: "",
      email: "",
      rol: "0",
      estado: "0",
      isUpdate: false
    });
  }

  render() {
    return (
      <main>
        <Menu></Menu>
        <form className="form-general" onSubmit={this.onSubmit}>
          <h5>Gestión de Usuarios</h5>
          <br />
          <div className="container">
            <div className="row">
              <div className="col-md-3">
                <output>Nombres:</output>
              </div>
              <div className="col-md-6">
                <input
                  id="nombres"
                  type="text"
                  className="controls"
                  value={this.state.username || ''}
                  onChange={this.onChangeUsername}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-3">
                <output>Apellidos:</output>
              </div>
              <div className="col-md-6">
                <input
                  id="apellidos"
                  type="text"
                  className="controls"
                  value={this.state.userlastname || ''}
                  onChange={this.onChangeLastname}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-3">Correo Electronico:</div>
              <div className="col-md-6">
                <input
                  id="apellidos"
                  type="text"
                  className="controls"
                  value={this.state.email || ''}
                  onChange={this.onChangeEmail}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-3">
                <output>Rol:</output>
              </div>
              <div className="col-md-6">
                <select
                  className="controls "
                  name="select"
                  onChange={this.onChangeRol}
                  value={this.state.rol}
                >
                  <option>Elija un Rol</option>
                  <option value="1">Administrador</option>
                  <option value="2">Vendedor</option>
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col-md-3">
                <output>Estado:</output>
              </div>
              <div className="col-md-6">
                <select
                  className="controls "
                  name="select"
                  onChange={this.onChangeEstado}
                  value={this.state.estado}
                >
                  <option>Elija un Estado</option>
                  <option value="1">Activo</option>
                  <option value="2">Inactivo</option>
                </select>
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-md-4 offset-md-4">
                {this.state.isUpdate  
                  ?  <button type="submit" className="btn btn-primary"                                           
                                          onClick={() => this.confirmUpdate(this.state._id)}>
                            Actualizar
                   </button>
                  : <button type="submit" className="btn btn-primary">
                  Guardar
                </button>} 
              </div>
            </div>
            {/* <div className="row">
              <div className="col-md-4 offset-md-4">
                <button type="submit" className="btn btn-primary">
                  Guardar
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 offset-md-4">
              <button type="submit" className="btn btn-primary"                                           
                                          onClick={() => this.updateUser(this.state._id)}>
                            Actualizar
              </button>
              </div>
            </div> */}
            <div className="row">
              {/* <div className="col-md-4">Form User</div> */}
              {/* <div className="col-md-8">
                <ul className="list-group">
                  {this.state.users.map((user) => (
                    <li
                      className="list-group-item list-group-action"
                      key={user._id}
                      onDoubleClick={() => this.deleteUser(user._id)}
                    >
                      {user.username} {user.userlastname}
                    </li>
                  ))}
                </ul>
              </div> */}
              <div className="col-md-12">
                <Table striped bordered hover variant="dark" responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Nombres</th>
                      <th>Apellidos</th>
                      <th>Correo</th>
                      <th>Rol</th>
                      <th>Estado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.users.map((user) => (
                      <tr key={user._id}>
                        <td>1</td>
                        <td >{user.username}</td>
                        <td >{user.userlastname}</td>
                        <td >{user.email}</td>
                        <td >{user.rol === "1" ? 'Administrador' : 'Vendedor' }</td>
                        <td >{user.estado === "1" ? 'Activo' : 'Inactivo'}</td>
                        <td>
                          {/* <Link  className="btn btn-primary" to={"/edit/"+ user._id}>
                          </Link> */}
                          <button type="submit" className="btn btn-warning" onClick={()=> this.getUser(user._id)} >
                            Editar
                          </button> 
                          <button type="submit" className="btn btn-danger"                                           
                                          onClick={() => this.confimarDelete(user._id)}>
                            Eliminar
                          </button>                        
                        </td>
                      </tr>
                    ))}                 
                  
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </form>
      </main>
    );
  }
}

export default Usuarios;
