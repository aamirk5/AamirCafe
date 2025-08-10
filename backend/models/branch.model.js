const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const branchSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  manager: { type: Schema.Types.ObjectId, ref: 'Admin' }
}, {
  timestamps: true,
});

const Branch = mongoose.model('Branch', branchSchema);

module.exports = Branch;
