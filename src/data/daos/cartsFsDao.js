import fs from 'fs/promises';

class CartsFsDao {
  #carts;
  constructor() {
    this.#carts = [];
    this.filename = './carts.json';
  }
  async find() {}
  async getOne(id) {}
  async create(data) {}
  async updateOne(idCart, product) {}
  async deleteOne(id) {}
  async deleteAllProducts(idCart) {}
}

export default CartsFsDao;
