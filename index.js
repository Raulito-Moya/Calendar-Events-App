
const express = require('express');
require('dotenv').config();  //para el entorno de desarrollo
const cors = require('cors');
const { dbConnection } = require('./database/config')

//console.log( process.env );

//crear el servidor de express

const app = express();

//Base de Datos

dbConnection()


//CORS
app.use(cors())

//Directorio publico
app.use( express.static('public') )

//Lectura y parseo del body
app.use( express.json() );

//Rutas 
app.use('/api/auth', require('./routes/auth') );
app.use('/api/events', require('./routes/events'))// Eventos

//Escuchar peticion
app.listen( process.env.PORT, ()=>{
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});