const { response } = require('express')
const Evento = require('../models/Evento');


const getEvents = async(req, res = response) => {
 
   /* const {uid, name} = req
    const token = await generarJWT(uid, name)  */

    const eventos = await Evento.find() //obtener la lista de eventos
                                .populate('user', 'name')  //coloco la referencia y lo que quiero que venga en ella
    res.json({
        ok: true,
        eventos
      
       })
  
}


const crearEventos = async(req, res = response) => {
  
  //console.log(req.body);

   const evento = new Evento( req.body ); 

   try {
       
    evento.user = req.uid

     const eventoGuardado = await evento.save()

     res.json({
         ok: true,
         evento: eventoGuardado
     })

   } catch (error) {
       console.log(error);
       res.status(500).json({
           ok: false,
           msg: 'Hbale con el administrador'
       })
   }

 

}


const actualizarEventos = async(req, res = response) => {

    //console.log(req.uid);
     const eventoId = req.params.id; //id del evento
     const uid = req.uid;  

    try {
        
       const evento = await Evento.findById( eventoId ) //verificar si el evnto existe
    
       if( !evento ) {
          return res.status(404).json({
               ok: false,
               msg: 'Evento no existe por ese id'
           })
       }

       if ( evento.user.toString() !== uid ) { //si el id del usuario es diferente del usuario que viene en la peticion
           return res.status(401).json({
               ok: false,
               msg: 'No tiene previlegio de editar este evento'
           })
       }


       const nuevoEvento = {
           ...req.body,
           user: uid
       }

       const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, { new: true} ); //la ultima opcion es para que retorne los datos actualizados
        
        res.json({
            ok: true,
            evento: eventoActualizado
        })

    } catch (error) {
         console.log(error);
         res.status(500).json({
             ok: false,
             msg: 'Hbale con el administrador'
         });
    } 
  

  }



  const eliminarEventos = async(req, res = response) => {

    const eventoId = req.params.id;
    const uid = req.uid;
    
    try {
     
        const evento = await Evento.findById( eventoId );

        if( !evento ) {
          return  res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            })
        }

        if ( evento.user.toString() !== uid ) { //si el id del usuario es diferente del usuario que viene en la peticion
            return res.status(401).json({
                ok: false,
                msg: 'No tiene previlegio de eliminar este evento'
            })
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }

         await Evento.findByIdAndDelete( eventoId  ); //se elimina el evento
  
        res.json({
            ok: true
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hbale con el administrador'
        });
    }


    
  
  }


/*{
    ok: true,
    msg: 'Otener eventos'
}*/


module.exports = {
    getEvents,
    crearEventos,
    actualizarEventos,
    eliminarEventos
}