const {Schema, model } = require('mongoose');

const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        trim:true,
        // unique:true
    },
    userlastname:{
        type:String,
        required:true,
        trim:true,
    },

    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
     rol:{
         type:String,
    },
    estado:{
        type:String,   
    }
},{
        timestamps: true
        
});

module.exports = model('User', userSchema);