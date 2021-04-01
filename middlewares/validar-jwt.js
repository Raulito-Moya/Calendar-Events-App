const { response } = require('express')
const  JWt = require('jsonwebtoken')


const validarJWT = ( req, res = response, next ) => {

   // x-token headers
   const token = req.header('x-token')
   
  //console.log(token);

  if ( !token ) {
     return res.status(401).json({
         ok: false,
         msg: 'No hay token en la peticion'
     });
  }

  try {

     const {uid, name} = JWt.verify(  //payload
         token,
         process.env.SECRET_JWT_SEED
     );

   //  console.log(payload);

    req.uid = uid
    req.name = name
      
  } catch (error) {
      console.log(error);
      return res.status(401).json({
          ok: false,
          msg: 'Token no valido'
      })
  }

   next() //next es la funcion que se va a llamar cuando ya se llamo el token
}

module.exports = { 
    validarJWT
}