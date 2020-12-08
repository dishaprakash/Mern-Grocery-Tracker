const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const grocerySchema = new Schema({
  username: { type: String, required: true },
  description: { type: String, required: true },
  quantity: { type: Number, required: true },
}, {
  timestamps: true,
});

const Grocery = mongoose.model('Grocery', grocerySchema);

module.exports = Grocery;