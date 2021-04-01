const { Schema, model } = require('mongoose'); //creo mi esquema para guardarlo en la base de datos

const EventoSchema = Schema({
    
    title: {
       type: String,
       required: true

    },
    notes: {
        type: String
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId, //va a ser una referencia
        ref: 'Usuario',
        required: true
    }

});

EventoSchema.method('toJSON', function() {  //para modificar el serializdor y deveolver el _id com id
    const {__v , _id, ...object} = this.toObject() //con this.Object tengo la referencia al objeto que se esta serializando
    object.id = _id
    return object

})

module.exports = model('Evento', EventoSchema)