const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  category: { type: String, required: true, enum: ['cleanse', 'treat', 'protect'] },
  price: { type: Number, required: true },
  desc: { type: String, default: '' },
  accent: { type: String, default: '' },
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Product', productSchema);
