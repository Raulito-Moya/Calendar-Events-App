/*
  Rutas de usuarios / Auth
  host + api/auth

*/ 


const { Router } = require('express');  //const router = express.Router
const { check } = require('express-validator')
const router = Router();

const { validarCampos } = require('../middlewares/validar-campos');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarJWT } = require('../middlewares/validar-jwt');


  router.post(
        '/new',
        [ //middlewares
          check('name', 'El nombre es obligatorio').not().isEmpty(),  //check([field //nombre a validar, message //mensaje a lanzar])
          check('email', 'El email es obligatorio').isEmail(),
          check('password', 'El password debe de ser de seis caracteres').isLength({ min: 6 }),
          validarCampos  //aqui implemento mi custom middleware
        ],
        crearUsuario );
  
  
  router.post(
    '/',
    [
       check('email','El email es obligatorio').isEmail(),
       check('password','El password debe de ser de seis caracteres').isLength({ min: 6 }),
       validarCampos
    ], 
    loginUsuario);
  
  
  router.get('/renew', validarJWT, revalidarToken );
  
  
  module.exports = router;
  