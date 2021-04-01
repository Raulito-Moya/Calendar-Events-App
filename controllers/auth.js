const {response} = require('express')  
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario')
const { generarJWT } = require('../helpers/jwt')



 const crearUsuario = async(req, res = response /*para configurar el tipado*/  ) => {
   
    // console.log(req.body);
     
   const { email, password } = req.body
 
    try {

       let usuario = await Usuario.findOne({ email: email})
         console.log(usuario);

         if( usuario ){
             return res.status(400).json({
                 ok: false,
                 msg: 'Un usuario existe con ese correo'
             })
         }

       usuario = new Usuario( req.body );
           
        //Encriptar contrasena
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        await  usuario.save();
         const token = await generarJWT( usuario.id, usuario.name); //generar el JWT

          res.status(201).json({
              ok: true,
              uid: usuario.id,
              name: usuario.name,
              token //token = token 
          })

    }catch ( error ) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }

}



const loginUsuario = async(req, res = response ) => {

    const {email, password} = req.body

    try {

      const usuario = await Usuario.findOne({ email: email})
      console.log(usuario);

      if( !usuario ){
          return res.status(400).json({
              ok: false,
              msg: 'El usuario no existe con ese email'
          })
      }   

      //confirmar los passwords 
      const validPassword = bcrypt.compareSync( password, usuario.password);
  
    if( !validPassword ){

        return res.status(400).json({
            ok: false,
            msg: 'Password incorrecto'
        })
    }
      
     //Generar nuestro JSON Web Token
     const token = await generarJWT( usuario.id, usuario.name);

     res.json({
         ok: true,
         uid: usuario.id,
         name: usuario.name,
         token
     })

   
    } catch (error) {
      console.log(error);
      res.status(500).json({
          ok: false,
          msg: 'Por favor hable con el administrador'
      })
    }


  
  };



const revalidarToken = async(req, res) => {

    const {uid, name} = req
    
   
    // generar un nuevo json web token y retornarlo en esta peticion
     const token = await generarJWT(uid, name)  
      
    res.json({
        ok: true,
        token
    })
  
  };

  module.exports = {
      crearUsuario,
      loginUsuario,
      revalidarToken
  }