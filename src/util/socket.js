const socketIO = require('socket.io');

const ProductManagerDb = require('../dao/managersDb/ProductManagerDb');
const productController = new ProductManagerDb('');

module.exports = (server) => {
  const io = socketIO(server);

  io.on('connection', async (socket) => {
    console.log('Cliente conectado');

    socket.emit('productos', await productController.getProducts());

    socket.on('newProduct', async (product) => {
      const newProduct = await productController.addProduct(product);
      if (!newProduct) {
        console.log('completa los datos');
      }
      socket.emit('productos', await productController.getProducts());
    });
  });
};
