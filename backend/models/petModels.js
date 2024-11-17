const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  email: { type: String, required: true },
  ownerName: { type: String, required: true },
  petName: { type: String, required: true },
  type: { type: String, required: true },
  species: { type: String, required: true },
  breed: { type: String, required: true },
  gender: { type: String, required: true },
  color: { type: String, required: true },
  size: { type: String, required: true },
  weight: { type: Number },
  age: { type: Number, required: true },
  vaccinated: { type: Boolean, required: true },
  image: { type: String, default: null },
  description: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  mobileNo: { type: String, required: true },
  energy: { type: String, required: true }
}, {
  timestamps: true, 
});

// Simple index on email for now
petSchema.index({ email: 1 });

const PetModel = mongoose.model('Pet', petSchema);
module.exports = PetModel;
