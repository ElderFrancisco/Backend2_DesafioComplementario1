const mongoose = require('mongoose');

const cartsCollection = 'carts';

const cartsSchema = new mongoose.Schema({
  products: [
    {
      id: Number,
      quantity: Number,
    },
  ],
});

const cartModel = mongoose.model(cartsCollection, cartsSchema);

module.exports = cartModel;
