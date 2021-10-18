const mongoose=require('mongoose');


// const URI=('mongodb://localhost/dev21');
const URI = process.env.MONGODB_URI 
? process.env.MONGODB_URI 
: 'mongodb://localhost/databasetest';


mongoose.connect(URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    
 
}).then(db=>console.log('bd conectada'))
.catch(error=>console.log(error))


const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log('BD conectada 2do metodo')
});

module.export=mongoose