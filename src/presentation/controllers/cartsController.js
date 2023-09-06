import cartsManager from '../../domain/managers/cartsManagers.js';

export const list = async(req, res) => {
  // console.log('cartsController list');
  const manager = new cartsManager();
  const carts = await manager.list();
  res.send({ status: 'success', carts });
};

export const getOne = async(req, res) => {
  const manager = new cartsManager();
  const carts = await manager.getOne(req.params.id);
  res.send({ status: 'success', carts });
};

export const deleteOne = async(req, res) => {};

export const create = async(req, res) => {
  const manager = new cartsManager();
  const carts = await manager.create(req.body);
  res.send({ status: 'success', carts });
};

export const updateOne = async(req, res) => {
  const manager = new cartsManager();
  const carts = await manager.updateOne(
    req.body.carts.id,
    req.body.carts.products
  );
  res.send({ status: 'success', carts });
};

export const deleteOneProduct = async(req, res) => {
  const { cid, pid } = req.params;
  const manager = new cartsManager();
  const cart = await manager.getOne({ _id: cid });
  const newProducts = cart.products.filter((product) => product.id != pid);
  const newCart = await manager.updateOne(cid, newProducts);
  res.send({ status: 'succes', newCart });
};

export const updateQuantity = async(req, res) => {
  const manager = new cartsManager();
  const cart = await manager.getOne({ _id: req.params.cid });
  const newProducts = cart.products.map((product) => {
    if (product._id == req.params.pid) {
      product.quantity = req.body.quantity;
    }
    return product;
  });
  const newCart = await manager.updateOne(req.params.cid, newProducts);
  res.send({ status: 'succes', newCart });
};

export const deleteAllproducts = async(req, res) => {
  const manager = new cartsManager();
  const cart = await manager.getOne({ _id: req.params.cid });
  const newCart = await manager.updateOne(req.params.cid, {});
  res.send({ status: 'succes', newCart });
};

export const closeCart = async(req, res) => {
  const manager = new cartsManager();
  const { ticket, cart } = await manager.closeCart(req.params.cid, req.body);
  const now = new Date(Date.now());
  res.send({ status: 'succes', ticket, cart });
};
