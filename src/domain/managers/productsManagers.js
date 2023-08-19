/**
 * @fileoverview Módulo que contiene la clase ProductsManager que gestiona los productos de la aplicación utilizando
 * la clase ProductsMongooseDao para interactuar con la base de datos.
 * @module managers/productsManager
 */
import productsMongooseDao from '../../data/daos/productsMongooseDao.js';

/**
 * Clase que gestiona los productos de la aplicación utilizando la clase ProductsMongooseDao para interactuar
 * con la base de datos.
 * @class
 */
class productsManager {
  /**
   * Crea una instancia de ProductsManager.
   * @constructor
   */
  constructor() {
    this.productsDao = new productsMongooseDao();
  }

  /**
   * Busca productos según el filtro y la consulta especificados.
   * @async
   * @param {Object} filter - Filtro de búsqueda.
   * @param {Object} query - Consulta de búsqueda.
   * @returns {Promise} Promise object que resuelve con una lista de productos que coinciden con los criterios de búsqueda.
   */
  async find(filter, query) {
    return this.productsDao.find(filter, query);
  }

  /**
   * Obtiene un solo producto según el ID especificado.
   * @async
   * @param {string} id - ID del producto a obtener.
   * @returns {Promise} Promise object que resuelve con el producto que coincide con el ID especificado.
   */
  async getOne(data) {
    return this.productsDao.getOne(data);
  }

  /**
   * Crea un nuevo producto utilizando los datos especificados si no existe un producto con el mismo código.
   * @async
   * @param {Object} data - Datos del producto a crear.
   * @returns {Promise} Promise object que resuelve con el producto recién creado si no existe un producto
   * con el mismo código; de lo contrario, resuelve con false.
   */
  async create(data) {
    let exist = await this.productsDao.findCode(data.code);
    if (!exist.length) {
      const product = await this.productsDao.create(data);
      return product;
    } else {
      return false;
    }
  }

  /**
   * Actualiza un producto existente según el ID especificado y los datos proporcionados.
   * @async
   * @param {string} id - ID del producto a actualizar.
   * @param {Object} data - Datos del producto actualizado.
   * @returns {Promise} Promise object que resuelve con el número de documentos actualizados en la base de datos.
   */
  async updateOne(id, data) {
    const success = await this.productsDao.updateOne(id, data);
    return success;
  }

  /**
   * Elimina un producto existente según el ID especificado.
   * @async
   * @param {string} id - ID del producto a eliminar.
   * @returns {Promise} Promise object que resuelve con el número de documentos eliminados en la base de datos.
   */
  async deleteOne(id) {
    return this.productsDao.deleteOne(id);
  }
}
export default productsManager;
