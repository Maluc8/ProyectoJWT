import mongoose, { Schema } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const userCollection = ' users';

const userSchema = new Schema({
  firstName: { type: Schema.Types.String },
  lastName: { type: Schema.Types.String },
  email: { type: Schema.Types.String, unique: true, required: true },
  age: { type: Schema.Types.Number, default: 18 },
  password: { type: Schema.Types.String },
  cart: { type: Schema.Types.ObjectId, ref: 'carts' },
  role: { type: Schema.Types.ObjectId, index: true, ref: 'roles' },
  isAdmin: { type: Schema.Types.Boolean, default: false },
});

userSchema.plugin(paginate);

userSchema.pre('find', function () {
  this.populate(['role']);
});

userSchema.pre('findOne', function () {
  this.populate(['role']);
});

export default mongoose.model(userCollection, userSchema);
