const cartModel = require('../models/carts.model.js');

class CartManagerDb {
  constructor() {}

  async createNewCart(body) {
    try {
      console.log(body);
      const products = body.products || [];
      if (!products) {
        console.log('tenes que enviar datos');
        return null;
      }
      const cart = {
        products,
      };
      console.log(cart);
      const createdCart = await cartModel.create(cart);
      return createdCart;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async getCartById(id) {
    try {
      const existCart = await cartModel.findById(id).lean();
      console.log(existCart);
      return existCart;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getCarts(limit) {
    try {
      const estimated = await cartModel.countDocuments();
      if (estimated === 0) {
        return null;
      }

      if (limit) {
        const cartListLimit = await cartModel.find().limit(limit);
        return cartListLimit;
      }
      const cartsList = await cartModel.find().lean();

      return cartsList;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async updateCart(cid, pid) {
    try {
      const cartToUpdate = await cartModel.findById(cid);

      if (!cartToUpdate) {
        return res.status(401).send('no se encontro el carrito');
      }

      const indexProduct = cartToUpdate.products.findIndex((product) => {
        return product.product == pid;
      });
      console.log(indexProduct);
      if (indexProduct >= 0) {
        cartToUpdate.products[indexProduct].quantity++;
      } else {
        cartToUpdate.products.push({ product: pid, quantity: 1 });
      }
      const result = await cartModel.updateOne({ _id: cid }, cartToUpdate);

      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}

module.exports = CartManagerDb;
