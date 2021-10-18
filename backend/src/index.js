require ('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const corse = require('cors');
const bodyparser = require('body-parser');
require('./database');

//settingd
app.set('Port', process.env.PORT || 4000);


//Middlewares
app.use(corse());
app.use(express.json());

//*************** */
app.use(morgan('dev'))

// app.use(bodyparser.urlencoded({extended:true}))

// app.use(bodyparser.json())

//Rutas importadas desde carpeta Routes
app.use('/api/', require('./routes/prueba.routes'));
app.use('/api/users', require('./routes/users.routes'));
app.use('/api/products', require('./routes/products.routes'));

//otra forma de hacer rutas
//app.get('/api/users', (req,res) => res.send('users Routes'));
//app.get('/api/Products', (req,res) => res.send('Products Routes'));


//iniciar servidor

// app.listen(app.get('Port'),()=>{
//     console.log('escuchando por el puerto', app.get('Port'))
// })

async function main(){
    await app.listen(app.get('Port'));
    console.log('Server port', app.get('Port'), 'por await');
}

main();

