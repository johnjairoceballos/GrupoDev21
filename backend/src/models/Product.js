const {Schema, model } = require('mongoose');

const productSchema = new Schema({
    producto: String,
    descripcion: String,
    autor: String
    
    
},{
    timestamps: true
});

module.exports = model('Product', productSchema);





