require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./database/config");
const app = express();

// Conectarse a la base de datos
dbConnection();

// Middleware
app.use(cors());
app.use(express.json());

// Ruta inicial
app.get("/api", (req, res) => {
  return res.json({
    msg: "Bienvenido al API de mi E-Commerce",
  });
});

// Rutas de autenticación
app.use("/api/auth", require("./routes/auth.routes"));

// Otras rutas para usuarios y productos
app.use("/api/usuarios", require("./routes/users.routes"));
app.use("/api/productos", require("./routes/products.routes"));

// Puerto para el servidor
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
