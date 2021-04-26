const { response } = require("express");


const validarAdmin  = (req = request , res = response,next)=> {

        if(!req.usuario)
        {
            return res.status(500).json({
                msg: 'se quiere verificar el rol sin el token'
            })
        }

            const {role,nombre}  =req.usuario;

            if(role !=='ADMIN_ROLE'){
                return res.status(401).json({
                    msg: `${nombre} no es admin`
                })
            }

    next()



}

const tieneRole = (...roles)=> {

    return (req = request , res = response,next) => {
        if(!req.usuario)
        {
            return res.status(500).json({
                msg: 'se quiere verificar el rol sin el token'
            })
        }
        if(roles.includes(req.usuario.role)){
            return res.status(401).json({
                msg: `el servicio requiere uno d eestos roles ${roles}`
            });
        }
        console.log(roles);
        next();

    }

}

module.exports = {
    validarAdmin,
    tieneRole
}