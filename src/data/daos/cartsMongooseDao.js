import cartsSchema from '../models/cartsSchema.js';
import productsSchema from '../models/productsSchema.js';

class CartsMongooseDao {
  async find() {
    return cartsSchema.find();
  }

  async getOne(id) {
    const cart = await cartsSchema
      .find({ _id: id })
      .populate('products.product')
      .exec()
      .then((result) => {
        return result;
      })
      .catch((error) => {
        throw new Error('Cart not found.');
      });
    const productDetails = await Promise.all(
      cart[0].products.map(async(cartProduct) => {
        const product = await productsSchema.find({ _id: cartProduct.product });
        return {
          id: product[0]._id.toString(),
          title: product[0].title,
          description: product[0].description,
          price: product[0].price,
          thumbnail: product[0].thumbnail,
          code: product[0].code,
          stock: product[0].stock,
          quantity: cartProduct.quantity
        };
      })
    );
    return { id: cart[0]._id, products: productDetails };
  }

  async create(data) {
    const cart = await cartsSchema.create({
      products: data.products
    });
    return cart;
  }

  async updateOne(idCart, product) {
    try {
      await this.deleteAllProducts(idCart);
    }
 catch (e) {
      throw new Error('Cart not found.');
    }
    let cart;
    product = Array.from(product);
    product.forEach(async(productToInsert) => {
      cart = await cartsSchema.findOneAndUpdate(
        { _id: idCart },
        {
          $addToSet: {
            products: {
              product: productToInsert.id,
              quantity: productToInsert.quantity
            }
          }
        }
      );
    });
    cart = await this.find(idCart);
    return cart;
  }

  async deleteOne(id) {
    let cart;
    try {
      cart = cartsSchema.deleteOne({ _id: id });
    }
 catch (e) {
      throw new Error('Cart not found.');
    }

    return cart;
  }

  async deleteAllProducts(idCart) {
    try {
      const cart = await cartsSchema.findOneAndUpdate(
        { _id: idCart },
        { $set: { products: [] } }
      );
    }
 catch (e) {
      throw new Error('Cart not found.');
    }
  }
}

export default CartsMongooseDao;
