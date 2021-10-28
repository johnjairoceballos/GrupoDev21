
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Button, Col, Row, Navbar, Nav, NavDropdown, Table, Modal } from 'react-bootstrap';
import './ventas_consult.css';
import Menu from "./../menu/menu";

//importamos los hooks
import { useState, useEffect } from 'react';

//importamos Axios para la conexión con el backend
import Axios from 'axios';

function Ventas_consult() {
  const [sale_list, set_sales_list] = useState([]);

  useEffect(() => {
    Axios.get('http://localhost:3001/api/v1/sale/list').then((res) => {
      console.log(res.data.sales);
      set_sales_list(res.data.sales);
    });
  }, [])

  return (
    <main >
      {<Menu></Menu>}
      <Table bordered hover className="table1">
        <thead>
          <tr>
            <th>#</th>
            <th>#_sale</th>
            <th>Descripción Sales</th>
            <th>Nombre Comprador</th>
            <th>Apellidos_Comprador</th>
            <th>Estado Compra</th>
            <th>Total</th>
            <th>Fecha Envío</th>
            <th>Fecha</th>
            <th>Productos</th>
          </tr>
        </thead>
        <tbody>
          {
            sale_list.map((value, key) =>
              <tr>
                <td>{key}</td>
                <td>{value.id_sale}</td>
                <td>{value.description_sale}</td>
                <td>{value.sellername}</td>
                <td>{value.sellerlastname}</td>
                <td>{value.state}</td>
                <td>{value.total_sale}</td>
                <td>{value.send_date}</td>
                <td>{value.delivery_date}</td>
                <td>{value.products_sale}</td>
              </tr>
            )
          }
        </tbody>
      </Table>
    </main >
  );
}

export default Ventas_consult;
