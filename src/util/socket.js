const socketIO = require('socket.io');

const ProductManagerDb = require('../dao/managersDb/ProductManagerDb');
const productController = new ProductManagerDb('');

const messageManagerDb = require('../dao/managersDb/MessagesManagerDb');
const messageController = new messageManagerDb('');

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

    socket.emit('Chat', await messageController.getMessages());

    socket.on('newChat', async (message) => {
      const newMessage = await messageController.addMessage(message);
      if (!newMessage) {
        console.log('completa los datos');
      }
      socket.emit('Chat', await messageController.getMessages());
    });
  });
};
