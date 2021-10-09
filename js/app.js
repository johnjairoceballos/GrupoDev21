const PRODUCTOS = [
  new Producto(1, "Tv samsung", 2510000, 1),
  new Producto(2, "Pulsar 200", 9500000, 0),
];

function validadExistencia(productoEntrada) {
  //alert(productoEntrada);
  let existencia = false;
  for (let producto of PRODUCTOS) {
    if (producto.descripcion == productoEntrada) {
      existencia = true;
    }
  }
  return existencia;
}

function mostrarProductos() {
  // console.log('Mostrar productos...')
  let listProductos = "";
  let item = 1;
  let disponibilidad;
  for (let producto of PRODUCTOS) {
    console.log("nombre: " + producto.descripcion);
    if (producto.disponible == 1) {
      disponibilidad = "Disponible";
    } else {
      disponibilidad = "Agotado";
    }
    if (producto.disponible == 1) {
      listProductos += 
        `<tr class="filaAgg">
            <td scope="row">${item}</td>      
            <td>${producto.descripcion}</td>    
            <td>${producto.precio}</td> 
            <td>${disponibilidad}</td> 
            <td><button type="button" class="btn btn-danger">Inactivar</button>
            <button type="button" class="btn btn-warning" id="${item}">Actualizar</button></td>
        </tr>`;
    } else {
      listProductos += 
        `<tr class="filaAgg">
            <td scope="row">${item}</td>      
            <td>${producto.descripcion}</td>    
            <td>${producto.precio}</td> 
            <td>${disponibilidad}</td> 
            <td><button type="button" class="btn btn-success">Activar</button>
            <button type="button" class="btn btn-warning" id="${item}">Actualizar</button></td>
        </tr>`;
    }
    item++;
  }
  document.getElementById("productosTable").innerHTML = listProductos;
}

function agregarProducto() {
  const forma = document.forms["formProducto"];
  let idproduct = 3;
  const descripcion = forma["iddescripcion"];
  const precio = forma["idPrecio"];
  const disponible = forma["idpd_estado"];

  if (descripcion.value != "") {
    if (!validadExistencia(descripcion.value)) {
      if (precio.value != "") {
        if (precio.value > 0) {
          const producto = new Producto(
            idproduct,
            descripcion.value,
            precio.value,
            disponible.value
          );
          console.log(producto);
          PRODUCTOS.push(producto);
          mostrarProductos();
          idproduct++;
        } else {
          alert("El precio no puede ser negativo");
        }
      } else {
        alert("El precio no puede ir vacio");
      }
    } else {
      alert("El producto ya existe");
    }
  } else {
    alert("La descripción no puede estar vacia");
  }
}
