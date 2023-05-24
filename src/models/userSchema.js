import mongoose, { Schema } from "mongoose";
import paginate from "mongoose-paginate-v2";

const userCollection = " users";

const userSchema = new Schema({
  firstName: { type: Schema.Types.String, required: true },
  lastName: { type: Schema.Types.String },
  email: { type: Schema.Types.String, unique: true, required: true },
  age: { type: Schema.Types.Number, default: 18 },
  password: { type: Schema.Types.String },
});

userSchema.plugin(paginate);

export default mongoose.model(userCollection, userSchema);
