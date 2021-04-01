const {response} = require('express');


 const usuarioGet =  (req, res =response) => {
     const {q,nombre = 'no name',apikey} = req.query;

    res.json({
        ok: true,
        msg: 'get api - controlador',
        q,
        nombre,
        apikey
    })
  }

  const usuarioPut  =  (req, res = response )  => {

    const id = req.params.id;

    res.json({
        ok: true,
        msg: 'put api  - controldor',
        id
    })
  }
  const usuarioPost  =  (req, res = response )  => {

    const {nombre,edad} = req.body;


    res.json({
        ok: true,
        msg: 'post api - controlador ',
        nombre,
        edad
    })
  }
  const usuarioDelete  =  (req, res = response )  => {
    res.json({
        ok: true,
        msg: 'delete api -  controlador',
    })
  }


  module.exports = 
  {
      usuarioGet,
      usuarioPut,
      usuarioPost,
      usuarioDelete

  }