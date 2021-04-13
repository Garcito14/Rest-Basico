const {response} = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { emailExiste } = require('../helpers/db-validators');


 const usuarioGet = async (req, res =response) => {
    // const {q,nombre = 'no name',apikey} = req.query;
    const {limite = 5,desde =0 } = req.query;
    const query = {estado :true};

      const [total,usuarios] =await  Promise.all([
       
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(desde))
          .limit(Number(limite))
    
      ])
    res.json({
      total,usuarios
    
    });
  }

  const usuarioPut  = async(req, res = response )  => {

    const {id} = req.params;
    const {_id,pass,google,correo, ...resto} = req.body;
      //validar contra base ded atos
      if(pass)
      {
        const salt = bcryptjs.genSaltSync();
        resto.pass = bcryptjs.hashSync(pass,salt);
      }
      const usuarioDB = await Usuario.findByIdAndUpdate(id,resto);
    res.json({
        ok: true,
        msg: 'put api  - controldors',
        id,
        usuarioDB
    })
  }
  const usuarioPost  =  async (req, res = response )  => {
 
     
    const {nombre,correo,pass,role} = req.body;
    const usuario = new Usuario({nombre,correo,pass,role});
   

    //verificar si el correo existe
   
    // encriptar la contraseña

    const salt = bcryptjs.genSaltSync();
    usuario.pass = bcryptjs.hashSync(pass,salt);
    //guardar

    await usuario.save();

    res.json({
        ok: true,
        msg: 'post api - controlador ',
        usuario
    })
  }
  const usuarioDelete  = async  (req, res = response )  => {

    const {id} = req.params
  
    // fisicamente NO RECOMENDADO

      //const usuario = await Usuario.findByIdAndDelete(id);

      // METODO RECOMENDADO

      const usuario  = await Usuario.findByIdAndUpdate(id, {estado:  false });
    res.json({
      
        id,
        usuario
    })
  }


  module.exports = 
  {
      usuarioGet,
      usuarioPut,
      usuarioPost,
      usuarioDelete

  }