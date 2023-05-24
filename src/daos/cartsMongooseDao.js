import cartsSchema from "../models/cartsSchema.js";
import productsSchema from "../models/productsSchema.js";

class CartsMongooseDao {
  async find() {
    return cartsSchema.find();
  }

  async getOne(id) {
    let cart = await cartsSchema
      .find({ _id: id })
      .populate("products.product")
      .exec()
      .then((result) => {
        return result;
      })
      .catch((error) => {
        return false;
      });
    const productDetails = await Promise.all(
      cart[0].products.map(async (cartProduct) => {
        const product = await productsSchema.find({ _id: cartProduct.product });
        return {
          id: product[0]._id.toString(),
          title: product[0].title,
          description: product[0].description,
          price: product[0].price,
          thumbnail: product[0].thumbnail,
          code: product[0].code,
          stock: product[0].stock,
          quantity: cartProduct.quantity,
        };
      })
    );
    return { id: cart[0]._id, products: productDetails };
  }

  async create(data) {
    let cart = await cartsSchema.create({
      products: data.products,
    });
    return cart;
  }

  async updateOne(idCart, product) {
    await this.deleteAllProducts(idCart);
    let cart;
    product = Array.from(product);
    product.forEach(async (productToInsert) => {
      cart = await cartsSchema.findOneAndUpdate(
        { _id: idCart },
        {
          $addToSet: {
            products: {
              product: productToInsert.id,
              quantity: productToInsert.quantity,
            },
          },
        }
      );
    });
    cart = await this.find(idCart);
    return cart;
  }

  async deleteOne(id) {
    return cartsSchema.deleteOne({ _id: id });
  }

  async deleteAllProducts(idCart) {
    const cart = await cartsSchema.findOneAndUpdate(
      { _id: idCart },
      { $set: { products: [] } }
    );
  }
}

export default CartsMongooseDao;
