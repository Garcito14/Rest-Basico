const { response } = require("express");
const Usuario  =require('../models/usuario')
const bcryptjs = require('bcryptjs');
const { generarJWT } = require("../helpers/generar_JWT");

const login = async (req,res = response) => 
{

        const {correo,pass} = req.body;

        try{

            //verificar si el correo existe
            const usuario = await Usuario.findOne({correo});
            if(!usuario)
            {
                return res.status(400).json({
                    msg: 'usuario/pass no son correctos'
                })
            }

            //si el usuario esta activo
            if(!usuario.estado)
            {
                return res.status(400).json({
                    msg: 'usuario no existe'
                })
            }

            //verificar contraseña
            const validPass = bcryptjs.compareSync(pass,usuario.pass);
            if(!validPass)
            {
                return res.status(400).json({
                    msg: 'usuario/pass no son correctos'
                })
            }

            //Generar el JWT

            const token  = await generarJWT(usuario.id);

            res.json({
                msg : 'hola',
                usuario,
                token
            })

        }
        catch(error){
            console.log(error);
            return res.stuatus(500).json({
                msg: 'algo salio mal'
            })
        }
   
}

module.exports = {
    login
}