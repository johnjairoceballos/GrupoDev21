window.onload = function () {
//Variables de productos de la base de datos 
const baseDeDatos=[
    {
        id: 1,
        nombre: 'Portátil',
        precio: 560000,
        imagen: 'img/productosVentas/laptop.png'
    },
    {
        id: 2,
        nombre: 'Teléfono',
        precio: 560000,
        imagen: 'img/productosVentas/phone.png'
    },
    {
        id: 3,
        nombre: 'Televisor',
        precio: 2502000,
        imagen: 'img/productosVentas/tv.png'
    },
    {
        id: 4,
        nombre: 'Impresora',
        precio: 850000,
        imagen: 'img/productosVentas/printer.png'
    },
    {
        id: 5,
        nombre: 'Teclado',
        precio: 23000,
        imagen: 'img/productosVentas/keyboard.png'
    },
    {
        id: 6,
        nombre: 'Tablet',
        precio: 230000,
        imagen: 'img/productosVentas/tablet.png'
    }
    ,
    {
        id: 7,
        nombre: 'Mouse',
        precio: 8000,
        imagen: 'img/productosVentas/mouse.png'
    }
    ,
    {
        id: 8,
        nombre: 'Lampara',
        precio: 120000,
        imagen: 'img/productosVentas/lamp.png'
    }
    ,
    {
        id: 9,
        nombre: 'Telefono IP',
        precio: 58000,
        imagen: 'img/productosVentas/phoneIP.png'
    }
    ,
    {
        id: 10,
        nombre: 'Switch',
        precio: 125000,
        imagen: 'img/productosVentas/switch.png'
    }
    ,
    {
        id: 11,
        nombre: 'Modem',
        precio: 45000,
        imagen: 'img/productosVentas/modem.png'
    }
    ,
    {
        id: 12,
        nombre: 'Disco Duro',
        precio: 230000,
        imagen: 'img/productosVentas/harddisk.png'
    }
];

let carrito=[];
let total = 0;
const DOMitems = document.querySelector('#itemsw');
const DOMcarrito = document.querySelector('#carrito');
const DOMtotal = document.querySelector('#total');
const DOMbotonVaciar = document.querySelector('#boton-vaciar');
const DOMbotonGuardar = document.querySelector('#boton-guardar');
// Funciones

/**
 * Dibuja todos los productos a partir de la base de datos. No confundir con el carrito
 */
 function renderizarProductos() {
    baseDeDatos.forEach((info) => {
        // Estructura
        const miNodo = document.createElement('div');
        miNodo.classList.add('card', 'col-sm-2');
        // Body
        const miNodoCardBody = document.createElement('div');
        miNodoCardBody.classList.add('card-body');
        // Titulo
        const miNodoTitle = document.createElement('h5');
        miNodoTitle.classList.add('card-title');
        miNodoTitle.textContent = info.nombre;
        // Imagen
        const miNodoImagen = document.createElement('img');
        miNodoImagen.classList.add('img-fluid');
        miNodoImagen.setAttribute('src', info.imagen);
        // Precio
        const miNodoPrecio = document.createElement('p');
        miNodoPrecio.classList.add('card-text');
        miNodoPrecio.textContent = '$'+formatNumber(parseInt(info.precio,10));
        // Boton 
        const miNodoBoton = document.createElement('button');
        miNodoBoton.classList.add('btn', 'btn-success');
        miNodoBoton.textContent = '+';
        miNodoBoton.setAttribute('marcador', info.id);
        miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);
        // Insertamos
        miNodoCardBody.appendChild(miNodoImagen);
        miNodoCardBody.appendChild(miNodoTitle);
        miNodoCardBody.appendChild(miNodoPrecio);
        miNodoCardBody.appendChild(miNodoBoton);
        miNodo.appendChild(miNodoCardBody);
        DOMitems.appendChild(miNodo);
    });
}

/**
 * Evento para añadir un producto al carrito de la compra
 */
function anyadirProductoAlCarrito(evento) {
    // Anyadimos el Nodo a nuestro carrito
    carrito.push(evento.target.getAttribute('marcador'))
    // Calculo el total
    calcularTotal();
    // Actualizamos el carrito 
    renderizarCarrito();

}

/**
 * Dibuja todos los productos guardados en el carrito
 */
function renderizarCarrito() {
    // Vaciamos todo el html
    DOMcarrito.textContent = '';
    // Quitamos los duplicados
    const carritoSinDuplicados = [...new Set(carrito)];
    // Generamos los Nodos a partir de carrito
    carritoSinDuplicados.forEach((item) => {
        // Obtenemos el item que necesitamos de la variable base de datos
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            // ¿Coincide las id? Solo puede existir un caso
            return itemBaseDatos.id === parseInt(item);
        });
        // Cuenta el número de veces que se repite el producto
        const numeroUnidadesItem = carrito.reduce((total, itemId) => {
            // ¿Coincide las id? Incremento el contador, en caso contrario no mantengo
            return itemId === item ? total += 1 : total;
        }, 0);
        // Creamos el nodo del item del carrito
        const miNodo = document.createElement('li');
        miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
        miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}$`;
        // Boton de borrar
        const miBoton = document.createElement('button');
        miBoton.classList.add('btn', 'btn-danger', 'mx-5');
        miBoton.textContent = 'X';
        miBoton.style.marginLeft = '1rem';
        miBoton.dataset.item = item;
        miBoton.addEventListener('click', borrarItemCarrito);
        // Mezclamos nodos
        miNodo.appendChild(miBoton);
        DOMcarrito.appendChild(miNodo);
    });
}

/**
 * Evento para borrar un elemento del carrito
 */
function borrarItemCarrito(evento) {
    // Obtenemos el producto ID que hay en el boton pulsado
    const id = evento.target.dataset.item;
    // Borramos todos los productos
    carrito = carrito.filter((carritoId) => {
        return carritoId !== id;
    });
    // volvemos a renderizar
    renderizarCarrito();
    // Calculamos de nuevo el precio
    calcularTotal();
}

/**
 * Calcula el precio total teniendo en cuenta los productos repetidos
 */
function calcularTotal() {
    // Limpiamos precio anterior
    total = 0;
    // Recorremos el array del carrito
    carrito.forEach((item) => {
        // De cada elemento obtenemos su precio
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
        total = total + miItem[0].precio;
    });
    // Renderizamos el precio en el HTML
    DOMtotal.textContent = formatNumber(total.toFixed(2));
}

/**
 * Varia el carrito y vuelve a dibujarlo
 */
function vaciarCarrito() {
    // Limpiamos los productos guardados
    carrito = [];
    // Renderizamos los cambios
    renderizarCarrito();
    calcularTotal();
}

// Eventos
DOMbotonVaciar.addEventListener('click', vaciarCarrito);

// Inicio
renderizarProductos();

DOMbotonGuardar.addEventListener('click',ImprimirTotal);

//ImprimirTotal
function ImprimirTotal() {
    // Limpiamos precio anterior
    let total = 0;
    let factura='';
    //let contador=1;
    // Recorremos el array del carrito
    carrito.forEach((item) => {
        // De cada elemento obtenemos su precio
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
        factura +=/*contador+" "+ */miItem[0].nombre+"..................."+miItem[0].precio+"\n";
       // contador++;
        total = total + miItem[0].precio;
    });
    // Mostramos el valor Total de la compra
    alert("El usuario compró los siguientes Item: \n"+factura+"TOTAL A PAGAR: "+formatNumber(total.toFixed(2))+ "$");
}

//Funcion para agregar formato de miles
function formatNumber(num) { 
    if (!num || num == 'NaN') return '-';
    if (num == 'Infinity') return '&#x221e;';
    num = num.toString().replace(/\$|\,/g, '');
    if (isNaN(num))
        num = "0";
    sign = (num == (num = Math.abs(num)));
    num = Math.floor(num * 100 + 0.50000000001);
    cents = num % 100;
    num = Math.floor(num / 100).toString();
    if (cents < 10)
        cents = "0" + cents;
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3) ; i++)
        num = num.substring(0, num.length - (4 * i + 3)) + '.' + num.substring(num.length - (4 * i + 3));
    return (((sign) ? '' : '-') + num /*+ ',' + cents*/);
}
}

