const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  email: { type: String,required: true },
  petName: { type: String, required: true },
  breed: { type: String, required: true },
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
  image: {
    type: String,
    default: null,
  }
}, {
  timestamps: true, 
});

petSchema.index({ email: 1 });

const PetModel = mongoose.model('Pet', petSchema);
module.exports = PetModel;
