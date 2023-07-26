const { Router } = require("express");
const { validarJWT } = require("../middlewares/jwt.middleware");

const {
  registrarUsuario,
  iniciarSesion,
  renovarToken,
} = require("../controllers/auth.ctrl");

const router = Router();

// Ruta para registrar un usuario
router.post("/register", registrarUsuario);

// Ruta para iniciar sesión
router.post("/login", iniciarSesion);

// Ruta para renovar el token JWT
router.get("/renew", validarJWT, renovarToken);

// Nueva ruta para acceder a /api/auth con GET
router.get("/", validarJWT, (req, res) => {
  // Aquí puedes agregar la lógica que deseas para la ruta /api/auth
  return res.json({
    msg: "Acceso a /api/auth con GET exitoso",
  });
});

module.exports = router;
