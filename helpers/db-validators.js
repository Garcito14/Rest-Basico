const Role = require('../models/role');
const Usuario = require('../models/usuario');


const RoleValido = async (role = '') =>
{
  const existeRol = await Role.findOne({role});
  if(!existeRol){
    throw new Error(`$ El rol ${role} no existe`)
  }
}


const emailExiste = async (correo ='') => 
{
    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail)
    {
        throw new Error(`$ El Correo ${correo} ya  existe`)
    }

}

const existeUsuario = async (id ) => 
{
    const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario)
    {
        throw new Error(`$ El Id ${id} no  existe`)
    }

}

module.exports = {

    RoleValido,
    emailExiste,
    existeUsuario
}