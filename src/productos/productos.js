import React, { Component } from "react";
// import "./login.css";
import "./productos.css";
import "./general.css";


import Menu from "./../menu/menu";



import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Form, Button, Table } from "react-bootstrap";
import { useState, useEffect } from "react"; // añadimos los hooks
import Axios from "axios";

function AppProducts(){

  const [barcode_add, set_barcode_add] = useState(0);
  const [description_add, set_description_add] = useState("");
  const [unit_cost_add, set_unit_cost_add] = useState(0);
  const [state_add, set_state_add] = useState("true");
  
  const [id_update, set_id_update ]=  useState(0);
  const [barcode_update, set_barcode_update] = useState("");
  const [description_update, set_description_update] = useState("");
  const [unit_cost_update, set_unit_cost_update] = useState(0);
  const [state_update, set_state_update] = useState("true");
  const [products, set_products] = useState([]);
  
  useEffect(() => {
    Axios.get("http://localhost:3001/api/v1/product/list").then((res) => {
      /*console.log(res.data.products);*/
      set_products(res.data.products);
    });
  }, []);
  const add_product_db = () => {
    console.log(barcode_add + description_add + unit_cost_add + state_add);
    Axios.post("http://localhost:3001/api/v1/product/add", {
      barcode: barcode_add,
      description: description_add,
      unit_cost: unit_cost_add,
      state: state_add,
    });
  };
  
  const delete_product = (_id) => {
    Axios.delete('http://localhost:3001/api/v1/product/delete/' + _id);
  }
  
  const update_product = (_id) =>{
    Axios.put('http://localhost:3001/api/v1/product/update', {
      _id:_id,
      barcode: barcode_update,
      description: description_update,
      unit_cost: unit_cost_update,
      state: state_update
    });
  }

 

  

  //render() {
    return (
      <main >
      <Menu></Menu>
      <div className="App">
      <Container className='product'>
        <h1>GESTIONAR PRODUCTOS</h1> 
        <hr/><hr/>
        {/* AGREGAR PRODUCTOS */}
        <Form>
          <Form.Group className="mb-3" controlId="formBasicBarcode">
            <Form.Label>Código de barras.</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ingrese el código de barra"
              onChange={(e) => {
                set_barcode_add(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicDescription">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el nombre del producto"
              onChange={(e) => {
                set_description_add(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicUnitCost">
            <Form.Label>Costo Unitario</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ingrese el costo del producto"
              onChange={(e) => {
                set_unit_cost_add(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicState">
            <Form.Check
              inline
              label="DISPONIBLE"
              name="estado"
              type="radio"
              id="1"
              onChange={(e) => {
                set_state_add("true");
              }}
            />
            <Form.Check
              inline
              label="AGOTADO"
              name="estado"
              type="radio"
              id="0"
              onChange={(e) => {
                set_state_add("false");
              }}
            />
          </Form.Group>

          <Button variant="success" onClick={add_product_db}>
            REGISTRAR
          </Button>
        </Form>
        {/* FIN AGREGAR PRODUCTO */}
        <hr />


        {/* LISTAR Y ELIMINAR PRODUCTOS */}
        <Table striped bordered hover size="sm">
          <thead>
            <tr className="cabecera_table">
              <th>#</th>
              <th>Código de Barras</th>
              <th>Descripción</th>
              <th>Costo por Unidad</th>
              <th>Estado</th>
              <th>Actualizar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {products.map((value, key) => (
              <tr>
                <td>{key + 1}</td>
                <td>{value.barcode}</td>
                <td>{value.description}</td>
                <td>{value.unit_cost}</td>
                <td>{value.state.toString()==='true'? 'Disponible': 'Agotado'}</td>
                <td><Button variant='warning' onClick={
                  () => {
                  set_id_update(value._id);
                  set_barcode_update(value.barcode);
                  set_description_update(value.description);
                  set_unit_cost_update(value.unit_cost);
                  set_state_update(value.state.toString());

                  document.getElementById('barcode_update').defaultValue = value.barcode;
                  document.getElementById('description_update').defaultValue = value.description;
                  document.getElementById('unit_cost_update').defaultValue = value.unit_cost;
                 
                  
                }
              }>EDITAR</Button></td>
                <td><Button variant='danger' onClick={() => delete_product(value._id)}>ELIMINAR</Button></td>
              </tr>
            ))}
          </tbody>
        </Table>
        {/* FIN DE LISTAR Y ELIMINAR PRODUCTOS */}

        <hr />
        {/* ACTUALIZAR PRODUCTOS */}
        <Form>
          <h2 className="update-products" >Actualizar Productos</h2>
          <Form.Group className="mb-3" controlId="formBasicBarcode">
            <Form.Label>Código de barras.</Form.Label>
            <Form.Control
            disabled ='true'
              id="barcode_update"
              type="number"
              placeholder="Ingrese el código de barra"
              onChange={(e) => {
                set_barcode_update(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicDescription">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              id="description_update"
              type="text"
              placeholder="Ingrese el nombre del producto"
              onChange={(e) => {
                set_description_update(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicUnitCost">
            <Form.Label>Costo Unitario</Form.Label>
            <Form.Control
              id="unit_cost_update"
              type="number"
              placeholder="Ingrese el costo del producto"
              onChange={(e) => {
                set_unit_cost_update(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicState">
            <Form.Check
              inline
              label="DISPONIBLE"
              name="estado"
              type="radio"
              id="1"
              onChange={(e) => {
                set_state_update("true");
              }}
            />
            <Form.Check
              inline
              label="AGOTADO"
              name="estado"
              type="radio"
              id="0"
              onChange={(e) => {
                set_state_update("false");
              }}
            />
          </Form.Group>

          <Button variant="warning" onClick={()=>{
            update_product(id_update)}}>
            ACTUALIZAR
          </Button>
        </Form>
        {/* FIN ACTUALIZAR PRODUCTOS */}
      </Container>
    </div>
     </main>
      
    );
  }
//}

export default AppProducts;
