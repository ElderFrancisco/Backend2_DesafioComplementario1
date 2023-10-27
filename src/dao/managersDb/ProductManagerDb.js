const productModel = require('../models/products.model');
const allowedFields = [
  'title',
  'description',
  'price',
  'thumbnail',
  'code',
  'stock',
  'category',
  'status',
];

class ProductManagerDb {
  constructor() {}

  async getProducts(limit) {
    try {
      const estimated = await productModel.countDocuments();
      if (estimated === 0) {
        return null;
      }

      if (limit) {
        const productsListLimit = await productModel.find().limit(limit);
        return productsListLimit;
      }
      const productsList = await productModel.find().lean();

      return productsList;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async getProductById(id) {
    try {
      const existProduct = await productModel.findById(id).lean();
      return existProduct;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async addProduct(body) {
    try {
      const title = body.title;
      const description = body.description;
      const price = body.price;
      const thumbnail = Array.isArray(body.thumbnail) ? body.thumbnail : [];
      const code = body.code;
      const stock = body.stock;
      const category = body.category;
      const status = body.status === false ? false : true;

      // lo comente yaque en el model pongo como unique:true el code

      //const existCode = await productModel.findOne({ code: code });
      //   if (existCode) {
      //     console.log(
      //       `El código ${code} coincide con el código ya existente de ${existCode.title}, para agregar el producto debera cambiar su code:${code}`,
      //     );
      //     return null;
      //   }

      if (!title || !description || !price || !category || !code || !stock) {
        console.log(
          `Por favor complete todos los campos solicitados de ${title}`,
        );

        return null;
      } else {
        const product = {
          title,
          description,
          code,
          price,
          status,
          stock,
          category,
          thumbnail,
        };
        let result = await productModel.create(product);
        return result;
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async updateProduct(id, body) {
    try {
      const productToUpdate = await productModel.findById(id);

      if (!productToUpdate) {
        return null;
      }

      const updatedProduct = {};

      allowedFields.forEach((campo) => {
        if (campo !== undefined) {
          updatedProduct[campo] = body[campo];
        } else {
          updatedProduct[campo] = productToUpdate[campo];
        }
      });

      await productModel.findByIdAndUpdate(id, updatedProduct);

      const existProduct = await productModel.findById(id);

      return existProduct;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async deleteProduct(id) {
    try {
      await productModel.findByIdAndDelete(id);
      const productsList = productModel.find().lean();
      return productsList;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

module.exports = ProductManagerDb;
