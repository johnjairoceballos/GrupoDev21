const mongoose = require('mongoose');


const sale_schema = new mongoose.Schema({
    id_sale: {
        type: String,
        required: true,
        min: 1
    },
    description_sale: {
        type: String,
        required: true,
        min: 1
    },
    sellername: {
        type: String,
        required: true
    },
    sellerlastname: {
        type: String,
        required: true
    },
    state: {
        type: Boolean,
        default: true
    },
    total_sale:{
        type: Number,
        default : 0,

    },
    send_date:{ 
        type: String, 
        default: Date 
    },

    delivery_date:{ 
        type: String, 
        default: Date 
    },
    products_sale: {
        type:String
    }
    
},
{
    timestamps: true
    
});

module.exports = mongoose.model('sale', sale_schema);