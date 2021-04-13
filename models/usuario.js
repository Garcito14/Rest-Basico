
const {Schema,model}  = require('mongoose');

const usuarioSchema = Schema({

    nombre:{
        type: String,
        require: [true,'el nombre es obligatorio']
    },
    correo:{
        type: String,
        require: [true,'el correo es obligatorio'],
        unique:true
    },
    pass:{
        type: String,
        require: [true,'La pass es obligatoria'],
      
    },
    img:{
        type: String,
      
        
    },
    role:{
        type: String,
        require :true,
        enum:['ADMIN_ROLE','USER_ROLE']
    },

    estado:{
        type: Boolean,
        default:true, 
    },
    google:{
        type: Boolean,
        default:false, 
    },
});

usuarioSchema.methods.toJSON = function()
{
    const {__v,pass, ...usuario} = this.toObject();
    return usuario
}

module.exports = model('Usuario' , usuarioSchema);