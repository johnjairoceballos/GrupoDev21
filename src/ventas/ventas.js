//npm i --save react-select
import Menu from "./../menu/menu";
import React, { Component, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "axios";
import { Container, Form, Button, Col, Row, Table } from 'react-bootstrap';
import './ventas.css';
import Swal from 'sweetalert2'
import { Link } from "react-router-dom";

function Ventas() {
    const [products_list, setProducts_list] = useState([]);
    const [users_list, set_users_list] = useState([]);
    let [product_add, set_product_add] = useState("");
    let [total_product_list, set_total_product_list] = useState(0);
    const [selectValue, set_selectValue] = useState('');
    let formatNumber = "";
    useEffect(() => {
        //debugger
        Axios.get('http://localhost:3001/api/v1/product/list').then((res) => { setProducts_list(res.data.products); });
        Axios.get("http://localhost:3001/api/v1/user/list").then((res) => { set_users_list(res.data.users); });
    }, [])


    const add_sales_db = () => {
        if (total_product_list != 0) {
            Swal.fire({
                title: 'Esta Seguro!!',
                text: "¿Está seguro que desea registrar la compra?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'SI'
            }).then((result) => {
                if (result.isConfirmed) {
                    Axios.post('http://localhost:3001/api/v1/sale/add', {
                        id_sale: 'GrupoDev21',
                        description_sale: 'f',
                        sellername: 'Wilbert',
                        sellerlastname: 'Rivas Granados',
                        state: 'true',
                        total_sale: total_product_list,
                        products_sale: product_add
                    }).then((res) => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Compra Registrada con exito',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    });
                }
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Debe cargar al menos un producto para registrar la compra',
                showConfirmButton: false,
                timer: 1500
            })
        }

    }
    const handleChange = (e) => {
        set_selectValue(e.target.value)
        //this.setState({ selectValue: e.target.value });
    }
    const handleDropdownChange = (e) => {
        this.setState({ selectValue: e.target.value });
    }
    formatNumber = (num) => {
        if (!num || num == 'NaN') return '-';
        if (num == 'Infinity') return '&#x221e;';
        num = num.toString().replace(/\$|\,/g, '');
        if (isNaN(num))
            num = "0";
        let sign = (num == (num = Math.abs(num)));
        num = Math.floor(num * 100 + 0.50000000001);
        let cents = num % 100;
        num = Math.floor(num / 100).toString();
        if (cents < 10)
            cents = "0" + cents;
        for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
            num = num.substring(0, num.length - (4 * i + 3)) + '.' + num.substring(num.length - (4 * i + 3));
        return (((sign) ? '' : '-') + num /*+ ',' + cents*/);
    };
    return (
        <Container className="col-md-8 contenedor contenedor" >
            <Menu></Menu>
            <div className="row">
                <div className="col-md-10"><h1>INTERFAZ DE VENTAS</h1></div>
            </div>
            <div className="row">
                <Form>
                    <Form.Group className="mb-12" controlId="formBasicEmail">
                        <div className="row">
                            <div className="col-md-4">
                                <Form.Label>
                                    <strong>CONSULTAR PRODUCTOS </strong>
                                </Form.Label>
                            </div>
                            <div className="col-md-5">
                                <Form.Control type="text" placeholder="Que desea consultar" name="searchProduct" />
                                <Form.Text className="text-muted">
                                    <div className="mensaje4"> Nos conectaremos con nuestro almacen de productos en linea </div>
                                </Form.Text>
                            </div>
                            <div className="col-md-3">
                                    {
                                    <Link to="/ventas_consult">
                                        <Button>Consultar</Button>
                                    </Link>
                                    }
                            </div>
                        </div>
                    </Form.Group>
                </Form>
            </div>
            <hr />
            <h4>Seleccione el usuario</h4>
            {/*<select value={selectValue} onChange={(e) => { handleChange(e.target.value); }} >
                {console.log(users_list)}
                {users_list.map((dpto, key) =>                 //recorro el state y muestro datos
                    <option value={dpto.username} Label={dpto.username}>

                    </option>
                )}
                </select>*/}
            <select >
                <option value='name' Label='WILBERT RIVAS'></option>;
                <option value='name' Label='CARLOS ANGULO'></option>;
                <option value='name' Label='MICHAEL MOSQUERA'></option>;
                <option value='name' Label='ANA SINISTERRA'></option>;
            </select>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Código de Barra</th>
                        <th>Description</th>
                        <th>Costo Unitario</th>
                        <th>Estado</th>
                        <th>Agregar al carrito</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products_list.map((value, key) =>
                            <tr>
                                <td>{key}</td>
                                <td>{value.barcode}</td>
                                <td>{value.description}</td>
                                <td>{value.unit_cost}</td>
                                <td>{(value.state.toString() == 'false' ? 'INACTIVO' : 'ACTIVO')}</td>
                                <td><Button variant="success" onClick={() => {
                                    set_product_add(product_add + '1-' + value.description + ' ----  ');
                                    set_total_product_list(total_product_list + parseInt(value.unit_cost));
                                    document.getElementById('producto_cargados').defaultValue = product_add;
                                    document.getElementById('total_product').defaultValue = formatNumber(total_product_list) + '$';
                                }}> ADD</Button></td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>

            <hr />
            <h2>Productos En carrito</h2>
            <Form.Group as={Row} className="mb-3" controlId="formHorizontalBarcode2dd">
                {/*<Form.Label column sm={2}> Código de Barra</Form.Label>*/}
                <Col sm={10}>
                    <Form.Control id='producto_cargados' disabled='true' as="textarea" type="text" placeholder="..............." />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formHorizontalUnitCostwe2">
                <Form.Label column sm={2} >Total de Compra: </Form.Label>
                <Col sm={10}>
                    <Form.Control id='total_product' disabled='true' type="text" placeholder="" />
                </Col>
            </Form.Group>
            <div className="row">
                <div className="col-md-2"><Button variant="primary" onClick={add_sales_db}>Finalizar Compra</Button></div>
            </div>
        </Container >
    );

}

export default Ventas;