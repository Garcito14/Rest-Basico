const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async (req = request,res = response,next) =>
{

    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg: 'no hay token'
        });
    }

    try {
     const {uid} =  jwt.verify(token,process.env.SECRETOPRIVATEKEY);
      

    const usuario =  await Usuario.findById(uid);

    if(!usuario)
    {
        return  res.status(401).json({
            msg: 'Usuario no existe en la DB'
        })
    }

    // verificar estado del uid

    if(!usuario.estado)
    {
        res.status(401).json({
            msg: 'Cuenta inactiva'
        })
    }

    req.usuario = usuario;
    next();

    }catch(error)
    {
        console.log(error);
        res.status(401).json({
            msg: 'token no valido'
        });
    }
   
}

module.exports = {
    validarJWT
}