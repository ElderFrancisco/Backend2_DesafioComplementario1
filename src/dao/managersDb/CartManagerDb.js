const cartModel = require('../models/carts.model.js');

class CartManager {
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
  updateCart(cid, pid) {
    try {
      const selectedCartIndex = this.carts.findIndex((cart) => cart.id === cid);
      console.log(selectedCartIndex);
      if (selectedCartIndex === -1) {
        return res
          .status(404)
          .send(`No se encontró ningún carrito con el ID proporcionado.`);
      }
      const selectedCart = this.carts[selectedCartIndex];
      console.log(selectedCart);

      const selectedProduct = selectedCart.products.find(
        (cart) => cart.id === pid,
      );
      console.log(selectedProduct);
      if (selectedProduct) {
        selectedProduct.quantity += 1;
      } else {
        selectedCart.products.push({ id: pid, quantity: 1 });
      }

      this.carts[selectedCartIndex] = selectedCart;

      fs.writeFile(this.path, JSON.stringify(this.carts, null, 2), (error) => {
        if (error) {
          console.log('Error al guardar los cambios en el archivo');
        } else {
          console.log('El producto fue actualizado correctamente');
        }
      });
      return selectedCart;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = CartManager;
