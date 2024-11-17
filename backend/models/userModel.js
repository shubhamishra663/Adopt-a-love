const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile_img: { type: String, default: null },
    cover_img: { type: String, default: null },
    token:{type:String,default:null},
    userType: { type: String, default: null },
    latitude: { type: Number, default: null },
    longitude: { type: Number, default: null },
    pets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pet' }] ,
    lostPets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'LostPet' }] ,
    mobileNo:{type:Number, default:null}
    
});

const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;
