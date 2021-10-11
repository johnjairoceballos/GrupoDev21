class Producto{
    constructor(idProducto,descripcion, precio, disponible){
        this._idProducto= idProducto;
        this._descripcion= descripcion;
        this._precio= precio;
        this._disponible = disponible;
    }
    get idProducto(){
        return this._idProducto;
    }
    set idProducto(idProducto){
        this._idProducto=idProducto;
    }
    get descripcion(){
        return this._descripcion;
    }
    set descripcion(descripcion){
        this._descripcion = descripcion;
    }

    get precio(){
        return this._precio;
    }
    set precio(precio){
        this._precio = precio;
    }
    get disponible(){
        return this._disponible;
    }
    set disponible(disponible){
        return this._disponible= disponible;
    }

}