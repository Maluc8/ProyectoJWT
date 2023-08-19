import mongoose, { Schema } from 'mongoose';

const cartCollection = `cart`;

const CartSchema = new Schema({
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: `products`,
        require: true,
      },
      quantity: { type: Schema.Types.Number, require: true },
      _id: false,
    },
  ],
});

export default mongoose.model(cartCollection, CartSchema);
