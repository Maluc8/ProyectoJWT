import cartsMongooseDao from '../../data/daos/cartsMongooseDao.js';
import TicketMongooseRepository from '../../data/repositories/mongoose/ticketMongooseRepository.js';
import productsManager from '../../domain/managers/productsManagers.js';

class cartsManager {
  constructor() {
    this.cartsDao = new cartsMongooseDao();
  }

  async list() {
    const carts = await this.cartsDao.find();
    return carts;
  }

  async getOne(id) {
    const cart = await this.cartsDao.getOne(id);
    return cart;
  }

  async create(data) {
    const cart = await this.cartsDao.create(data);
    return cart;
  }

  async updateOne(id, data) {
    const cart = await this.cartsDao.updateOne(id, data);
    return cart;
  }

  async deleteOne(id) {
    return await this.cartsDao.deleteOne(id);
  }

  async deleteOneProduct(data) {
    return await this.cartsDao.deleteOneProduct(data);
  }

  async closeCart(id, client) {
    const cart = this.cartsDao.getOne(id);
    const productManager = new productsManager();
    let ticket;
    const cartUnavailable = cart.products.filter(
      (product) => product.quantity > product.stock
    );
    const cartAvailable = cart.products.filter(
      (product) => product.quantity <= product.stock
    );
    this.updateOne(id, cartUnavailable);
    cart.products.forEach(product => {
      productManager.updateOne(product.id, { stock: product.stock - product.quantity });
    });
    const amount = cartUnavailable.reduce((acc, product) => acc = product.price * product.quantity);
    if (cartAvailable){
      ticket = new TicketMongooseRepository();
      const now = new Date(Date.now());
      const data = {
        code : now.getTime(),
        purchaseDateTime : now.toString(),
        amount : amount,
        purchaser : client.email
      };
      await ticket.create(data);
    }
    return (ticket, cartUnavailable);
  }
}
export default cartsManager;
