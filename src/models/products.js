const { Schema, model } = require('mongoose');

const ProductSchema = Schema({
  name: {
    type: String,
    required: [true, "El nombre del producto es obligatorio"],
  },
  price: {
    type: Number,
    required: [true, "El precio del producto es obligatorio"],
  },
  description: {
    type: String,
    required: [true, "La descripción del producto es obligatoria"],
  },
  image: {
    type: String,
  },
  category: {
    type: String,
    required: [true, "La categoría del producto es obligatoria"],
  },
  quantity: {
    type: Number,
    default: 0,
  },
});

ProductSchema.methods.toJSON = function () {
  const { __v, _id, ...rest } = this.toObject;
  rest.id = _id;
  return rest;
}

module.exports = model("Product", ProductSchema);
