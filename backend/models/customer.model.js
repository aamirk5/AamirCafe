const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const customerSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cellphoneNumber: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
}, {
  timestamps: true,
});

customerSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

customerSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
