const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Map, of: Number, required: true }, // e.g., { small: 10, medium: 15 }
  category: { type: String, required: true },
  subcategory: { type: String, required: true },
  image: { type: String, required: true },
  stockQuantity: { type: Number, required: true },
  branch: { type: Schema.Types.ObjectId, ref: 'Branch', required: true },
  isFeatured: { type: Boolean, default: false },
  isOutOfStock: { type: Boolean, default: false },
}, {
  timestamps: true,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
