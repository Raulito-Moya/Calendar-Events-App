/*
  Event Routes
  '/api/events'
*/ 


const { Router } = require('express');
const { check } = require('express-validator')
const { isDate } = require('../helpers/isDate');

const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEvents, crearEventos, actualizarEventos, eliminarEventos } = require('../controllers/events');

const router = Router();




//Todas tienen que pasar por la validacion del JWT
router.use( validarJWT );

//Obtener Eventos
router.get('/', getEvents)

//crear un nuevo evento
router.post(
  '/',
    [
      check('title','El titulo es obligatorio').not().isEmpty(),
      check('start','Fecha de inicio es obligatoria').custom(isDate ),
      check('end','Fecha de finalizacion es obligatoria').custom(isDate ), //validar la fecha
      validarCampos
    ],
crearEventos)

//Actualiz Eventos
router.put('/:id', actualizarEventos)

//eliminar Eventos

router.delete('/:id', eliminarEventos)


module.exports = router
//Crear un nuevo Evento
//router.post('/', crearEvento)