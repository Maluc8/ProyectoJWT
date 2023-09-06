import mongoose, { Schema } from 'mongoose';

const ticketCollection = 'tickets';
const ticketSchema = new Schema({
  id: { type: Schema.Types.String },
  code: { type: Schema.Types.String },
  purchaseDateTime: { type: Schema.Types.Date },
  amount: { type: Schema.Types.Number },
  purchaser: { type: Schema.Types.String }
});

export default mongoose.model(ticketCollection, ticketSchema);
