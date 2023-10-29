//
//
const ProductManagerDb = require('../../dao/managersDb/ProductManagerDb');
const productController = new ProductManagerDb();

module.exports = (app) => {
  app.get('/', async (req, res) => {
    try {
      const limit = parseInt(req.query.limit);
      const productsList = await productController.getProducts(limit);
      res.render('home', { productsList });
    } catch (error) {
      console.log(error);
    }
  });

  app.get('/realtimeproducts', async (req, res) => {
    try {
      res.render('realTimeProducts');
    } catch (error) {
      console.log(`[ERROR] -> ${error}`);
      res.status(500).json({ error: 'Error al obtener los productos' });
    }
  });

  app.get('/chat', async (req, res) => {
    try {
      res.render('chat');
    } catch (error) {
      console.log(`[ERROR] -> ${error}`);
      res.status(500).json({ error: 'Error al obtener los mensajes' });
    }
  });
};
