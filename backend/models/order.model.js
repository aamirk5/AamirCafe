const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  customer: { type: Schema.Types.ObjectId, ref: 'Customer' },
  guest: {
    name: { type: String },
    phone: { type: String },
    address: { type: String }
  },
  products: [{
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
    size: { type: String },
    quantity: { type: Number }
  }],
  totalPrice: { type: Number, required: true },
  orderType: { type: String, enum: ['delivery', 'pickup'], required: true },
  deliveryAddress: { type: String },
  pickupTime: { type: Date },
  paymentMethod: { type: String, enum: ['Easypaisa', 'JazzCash', 'COD'], required: true },
  status: { type: String, enum: ['Pending', 'Processing', 'Out for Delivery', 'Delivered', 'Picked Up'], default: 'Pending' },
  branch: { type: Schema.Types.ObjectId, ref: 'Branch', required: true },
}, {
  timestamps: true,
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
