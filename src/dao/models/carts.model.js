const mongoose = require('mongoose');

const cartsCollection = 'carts';

const cartsSchema = new mongoose.Schema({
  products: [
    {
      quantity: {
        type: Number,
      },
    },
  ],
});

const cartModel = mongoose.model(cartsCollection, cartsSchema);

module.exports = cartModel;
