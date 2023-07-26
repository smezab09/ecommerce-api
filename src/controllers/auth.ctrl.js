const User = require("../models/user");
const bcrypt = require("bcrypt")
const { generarJWT } = require('../helpers/jwt.helper')

const registrarUsuario = async (req, res) => {
try {
const { user_name, password } = req.body;
const user = await User.findOne({user_name: user_name});

if (user) {
    return res.status(400).json({
        ok: false,
        msg: `El usuario ${user_name} ya existe`,
        data: {}
    });
};

const salt = bcrypt.genSaltSync(10);


const nuevo_usuario = { 
    user_name, 
    password: bcrypt.hashSync(password, salt) 
}; 

const new_user = await User(nuevo_usuario).save();

const token = await generarJWT(new_user.id);

    return res.json({
        ok: true,
        msg: "Usuario registrado",
        data: new_user,
        token,
    });

} catch (error) {
        return res.status(500).json({
          ok: false,
          msg: "Error en el servidor",
          data: {},
        });
};
};

const iniciarSesion = async (req, res) => {

    const { user_name, password }  = req.body;
    const user = await User.findOne({user_name: user_name});
    if(!user) {
        return res.status(404).json({
            ok: false,
            msg: "Usuario inexistente",
            data: {},
        });
    };

    const validPassword = bcrypt.compareSync(password, user.password);
    if(!validPassword) {
        return res.status(400).json({
        ok: false,
        msg: "Contraseña incorrecta",
        data: {},
        })
    }

    const token = await generarJWT(user.id);

    return res.json ({
        ok: true,
        msg: "acceso exitoso",
        data: user,
        token,
    });
};

const renovarToken = async (req, res) => {

    const { user } = req;
    
    const token = await generarJWT(user.id)

    return res.json({
        ok: true,
        msg: "token renovado",
        data: user,
        token
    });
};

module.exports = {
    registrarUsuario,
    iniciarSesion,
    renovarToken
}