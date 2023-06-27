import productsSchema from "../models/productsSchema.js";

// Clase que proporciona una interfaz para interactuar con la base de datos de productos utilizando Mongoose.
class ProductsMongooseDao {
  // Encuentra los productos que coinciden con el filtro y los parámetros de consulta especificados.
  async find(filter, query) {
    let list = await productsSchema.paginate(filter, query);
    if (!list._id) {
      throw new Error("Products not found.");
    }
    // Formatea la lista de productos para que coincida con la especificación de la API.
    list.payload = list.docs.map((product) => ({
      id: product._id.toString(),
      title: product.title,
      description: product.description,
      price: product.price,
      thumbnail: product.thumbnail,
      code: product.code,
      stock: product.stock,
      stat: product.stat,
    }));
    // Elimina los documentos originales de la lista de productos ya que se van a mostrar de otra manera.
    list.docs = undefined;
    return list;
  }

  // Encuentra un producto por su ID.
  async getOne(id) {
    let product = await productsSchema.find({ _id: id });
    if (!product._id) {
      throw new Error("Product not found.");
    }
    // Formatea el producto para que coincida con la especificación de la API.
    product = product.map((product) => ({
      id: product._id.toString(),
      title: product.title,
      description: product.description,
      price: product.price,
      thumbnail: product.thumbnail,
      code: product.code,
      stock: product.stock,
      stat: product.stat,
    }));
    return product;
  }

  // Crea un nuevo producto en la base de datos.
  async create(data) {
    let product = await productsSchema.create(data);
    // Formatea el nuevo producto para que coincida con la especificación de la API.
    product = {
      id: product._id.toString(),
      title: product.title,
      description: product.description,
      price: product.price,
      thumbnail: product.thumbnail,
      code: product.code,
      stock: product.stock,
      stat: product.stat,
    };
    return product;
  }

  // Actualiza un producto existente por su ID.
  async updateOne(id, data) {
    const success = await productsSchema.updateOne({ _id: id }, data);
    if (success._id) {
      throw new Error("Product not found.");
    }
    return success.matchedCount;
  }

  // Elimina un producto existente por su ID.
  async deleteOne(id) {
    let product = await productsSchema.find({ _id: id });
    if (!product._id) {
      throw new Error("Product not found.");
    }
    product[0].stat = false;
    // Actualiza el producto para que se marque como eliminado en la base de datos.
    return productsSchema.updateOne({ _id: id }, product[0]);
  }

  // Encuentra un producto por su código.
  async findCode(productCode) {
    const product = await productsSchema.find({ code: productCode });
    return product;
  }
}

export default ProductsMongooseDao;
