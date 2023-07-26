const Product = require('../models/products');

const obtenerProductos = async (req, res) => {
  try {
    const productos = await Product.find();
    return res.json({
      ok: true,
      msg: "Productos obtenidos",
      data: productos,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error al obtener los productos",
      data: {},
    });
  };
};

const obtenerProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await Product.findById(id);
    if (!producto) {
      return res.status(404).json({
        ok: false,
        msg: "Producto no encontrado",
        data: {},
      });
    }
    return res.json({
      ok: true,
      msg: "Producto obtenido",
      data: producto,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error al obtener el producto",
      data: {},
    });
  }
};

const crearProducto = async (req, res) => {
  try {
    const { name, price, description, image, category, quantity } = req.body;

    const nuevoProducto = new Product({
      name,
      price,
      description,
      image,
      category,
      quantity,
    });

    const productoCreado = await nuevoProducto.save();

    return res.json({
      ok: true,
      msg: "Producto creado",
      data: productoCreado,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error al crear el producto",
      data: {},
    });
  }
};

const actualizarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description, image, category, quantity } = req.body;

    const productoActualizado = await Product.findByIdAndUpdate(
      id,
      {
        name,
        price,
        description,
        image,
        category,
        quantity,
      },
      { new: true }
    );

    if (!productoActualizado) {
      return res.status(404).json({
        ok: false,
        msg: "Producto no encontrado",
        data: {},
      });
    }

    return res.json({
      ok: true,
      msg: "Producto actualizado",
      data: productoActualizado,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error al actualizar el producto",
      data: {},
    });
  }
};

const eliminarProducto = async (req, res) => {
  try {
    const { id } = req.params;

    const productoEliminado = await Product.findByIdAndRemove(id);

    if (!productoEliminado) {
      return res.status(404).json({
        ok: false,
        msg: "Producto no encontrado",
        data: {},
      });
    }

    return res.json({
      ok: true,
      msg: "Producto eliminado",
      data: productoEliminado,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error al eliminar el producto",
      data: {},
    });
  }
};

module.exports = {
  obtenerProductos,
  obtenerProducto,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
};
