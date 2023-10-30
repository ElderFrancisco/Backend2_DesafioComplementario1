const mongoose = require('mongoose');

const cartsCollection = 'carts';

const cartsSchema = new mongoose.Schema({
  products: {
    type: [
      {
        product: {
          type: mongoose.SchemaTypes.ObjectId,
          ref: 'prodcuts',
        },
        quantity: Number,
      },
    ],
    default: [],
  },
});

const cartModel = mongoose.model(cartsCollection, cartsSchema);

module.exports = cartModel;
