const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const promotionSchema = new Schema({
  code: { type: String, required: true, unique: true },
  discountType: { type: String, enum: ['percentage', 'buy-one-get-one'], required: true },
  discountValue: { type: Number }, // For percentage discounts
  isActive: { type: Boolean, default: true },
}, {
  timestamps: true,
});

const Promotion = mongoose.model('Promotion', promotionSchema);

module.exports = Promotion;
