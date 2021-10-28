import React, { Component, useState } from "react";
import "./menu.css";
import { Link } from "react-router-dom";



class Menu extends Component {

  state = {
    isSwitchOn: false,
    rol : sessionStorage.getItem('rol')
    
  };
    
  render() {
    
    console.log(this.state.isSwitchOn);
    return (
      <main>
        <form>
          <div
            id="sidemenu"
            className={
              this.state.isSwitchOn === true ? "menu-expanded" : "menu-collapsed"
            }
          >
            {/* <!-- header --> */}
            <div id="header">
              <div id="title">
                <span>Sistema de Ventas </span>
              </div>
              <div
                id="menu-btn"
                onClick={() =>
                  this.setState({ isSwitchOn: !this.state.isSwitchOn })
                }
              >
                <div className="btn-hamburger"></div>
                <div className="btn-hamburger"></div>
                <div className="btn-hamburger"></div>
              </div>
            </div>
            {/* <!-- profile --> */}
            <div id="profile">
              <div id="photo">
                <img src="img/logo7.png" alt="" />
              </div>
              <div id="name">
                <span>{sessionStorage.getItem('nombre')}</span>
              </div>
            </div>

            {/* <!-- items --> */}
            <div className="menu-items">
              <div className="item">
                <Link to="/productos">
                  <div className="icon">
                    <img src="../img/iconos/producto2.png" alt="" />
                  </div>
                  <div className="title">
                    <span>Productos</span>
                  </div>
                </Link>
               
              </div>

              <div className="item separator"></div>

              <div className="menu-items">
                <div className="item">
                  <Link to="/ventas">
                    <div className="icon">
                      <img src="img/iconos/ventas2.png" alt="" />
                    </div>
                    <div className="title">
                      <span>Ventas</span>
                    </div>
                  </Link>
                </div>
              </div>

              <div className="item separator"></div>
              
               {sessionStorage.getItem('rol') === "1" && (
              <div className="menu-items">
                <div className="item">
                  <Link to="/usuarios">
                    <div className="icon">
                      <img src="img/iconos/usuario2.png" alt="" />
                    </div>
                    <div className="title">
                      <span>Usuarios</span>
                    </div>
                  </Link>
                </div>
              </div>
               )}

              <div className="item separator"></div>

            <div id="menu-items">
            <div class="item">
              <Link to="/">
                <div class="icon">
                  <img src="img/iconos/salida.png" alt="" />
                </div>
                <div class="title">
                  <span>Salir</span>
                </div>
              </Link>
            </div>
          </div>
            </div>
          </div>
        </form>
      </main>
    );
  }
}

export default Menu;
