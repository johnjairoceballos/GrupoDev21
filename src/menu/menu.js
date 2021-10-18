import React, { Component } from "react";
import "./menu.css";
import { Link } from "react-router-dom";

class Menu extends Component {
  state = {
    isSwitchOn: false,
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
                <span>Usuario</span>
              </div>
            </div>

            {/* <!-- items --> */}
            <div className="menu-items">
              <div className="item">
                <Link to="/">
                  <div className="icon">
                    <img src="../img/iconos/producto2.png" alt="" />
                  </div>
                  <div className="title">
                    <span>Productos</span>
                  </div>
                </Link>
                {/* <a href="#">
                  <div className="icon">
                    <img src="../img/iconos/producto2.png" alt="" />
                  </div>
                  <div className="title">
                    <span>Productos</span>
                  </div>
                </a> */}
              </div>

              <div className="item separator"></div>

              <div className="menu-items">
                <div className="item">
                  <a>
                    <div className="icon">
                      <img src="img/iconos/ventas2.png" alt="" />
                    </div>
                    <div className="title">
                      <span>Ventas</span>
                    </div>
                  </a>
                </div>
              </div>

              <div className="item separator"></div>

              <div className="menu-items">
                <div className="item">
                  <a>
                    <div className="icon">
                      <img src="img/iconos/usuario2.png" alt="" />
                    </div>
                    <div className="title">
                      <span>Usuarios</span>
                    </div>
                  </a>
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
