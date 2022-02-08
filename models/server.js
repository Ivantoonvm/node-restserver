const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server{
    
    constructor(){
        this.app = express();
        this.port= process.env.PORT;
        this.usuariosRoutePath = '/api/usuarios';
        
        //Conectar a base de datos
        this.conectarDB();

        //Middlewares
        this.middleware();
        

        //Rutas de mi aplicacion
        this.routers();
    }

    async conectarDB(){
        await dbConnection();
    }

    middleware(){

        //cors
        this.app.use(cors());

        //Parseo y lectura del body
        this.app.use(express.json());


         //Directorio publico 
         this.app.use(express.static('public'));

    }

    routers(){
        this.app.use(this.usuariosRoutePath, require('../routes/user'));
    }

    listen(){
            this.app.listen(process.env.PORT, ()=>{
            console.log('Servidor en el puerto', this.port);
        });
     }
}

module.exports =Server;