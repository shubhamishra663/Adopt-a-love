const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const bcrypt = require('bcrypt');
const UserModel = require('./models/userModel');
const PetModel=require('./models/petModels')
const LostPetModel=require('./models/LostPetModel')
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;


const app = express();
const port = process.env.PORT || 5000;
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/UsersData';

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(cookieParser());

// Cloudinary configuration
cloudinary.config({
  secure: true,
  cloud_name: 'dvxvoko1w',
  api_key: '643982455562463',
  api_secret: 'drGZ5fc7J-30m23u_parhx3rjCw'
});

// Multer configuration
const upload = multer(); // Configured multer for file uploads


mongoose.connect(MONGODB_URL).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Token verification middlewarey
const verifyToken = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  
  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }
  const secretKey = process.env.SECRET_CODE || 'shhhh';

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded; 
    next(); 
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: "Token expired" });
    }
    return res.status(401).json({ message: "Invalid token" });
  }
};

app.get('/',(req,res)=>{
  res.status(200).send("OK_OK")
})




// Signup Route
app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  if (!(name && email && password)) {
    return res.status(400).send('All fields are required');
  }

  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    return res.status(401).send('User already exists');
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ name, email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, email },
      'shhhh',
      {
        expiresIn: '2h'
      }
    );

    newUser.token = token;

    res.status(200).json({ message: 'Signup successful', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});




// Login Route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    const token = jwt.sign(
      { id: user._id ,email},
      'shhhh',
      {
        expiresIn: '5h'
      }
    );
    user.token = token;

    const options = {
      maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
      httpOnly: true,
      sameSite:'None'
    };

    res.status(200).cookie("token", token, options).json({ message: 'Login successful', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




//profile:email
app.get('/profile/:email', verifyToken, async(req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  try {
    const user = await UserModel.findById(req.user.id); // Assuming you're using Mongoose
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({
      message: `Welcome, ${user.name}`,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
  
});




// Route to get all pets of a user by email
app.get('/user-pets/:email', verifyToken,async (req, res) => {
  const { email } = req.params;

  try {
    const user = await UserModel.findOne({ email }).populate('pets');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'User pets fetched successfully',
      pets: user.pets
    });
  } catch (error) {
    console.error('Error fetching user pets:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});





// Route to get all lostPets of a user by email
app.get('/user-lostPets/:email', verifyToken,async (req, res) => {
  const { email } = req.params;

  try {
    const user = await UserModel.findOne({ email }).populate('lostPets');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'User Lostpets fetched successfully',
      lostPets: user.lostPets
    });
  } catch (error) {
    console.error('Error fetching user pets:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});







app.post('/petAdd', upload.single('image'), async (req, res) => {
  const { email, petName, age, species, breed, gender, weight, color, size, vaccinated, description, state, city, mobileNo, energy } = req.body;

  try {
      // Ensure image is available before attempting to upload
      if (!req.file) {
          return res.status(400).json({ message: 'No image uploaded' });
      }

      // Create a promise to handle the Cloudinary upload
      const uploadImage = () => {
          return new Promise((resolve, reject) => {
              cloudinary.uploader.upload_stream({
                  resource_type: 'auto',
                  use_filename: true,
                  unique_filename: false,
                  overwrite: true,
              }, (error, result) => {
                  if (error) {
                      reject(error);
                  } else {
                      resolve(result);
                  }
              }).end(req.file.buffer);  // Use the buffer instead of stream
          });
      };

      // Wait for the upload to complete
      const uploadResult = await uploadImage();

      // Create new pet entry in the database
      const newPet = new PetModel({
          email,
          petName,
          age,
          species,
          breed,
          gender,
          weight,
          color,
          size,
          vaccinated,
          description,
          image: uploadResult.secure_url, // Use the secure URL from Cloudinary
          state,
          city,
          mobileNo,
          energy,
      });

      const savedPet = await newPet.save();

      // Update user with the new pet reference
      const user = await UserModel.findOneAndUpdate(
          { email },
          { $push: { pets: savedPet._id } },
          { new: true }
      );

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({
          message: 'Pet added successfully and user updated',
          pet: savedPet,
          // user,
      });

  } catch (error) {
      console.error('Error adding pet:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});





app.post('/lostPetAdd', upload.single('image'), async (req, res) => {
  const { email, petName, age, species, breed, gender, weight, color, size, vaccinated, description, state, city, mobileNo, energy } = req.body;

  try {
      // Ensure image is available before attempting to upload
      if (!req.file) {
          return res.status(400).json({ message: 'No image uploaded' });
      }

      // Create a promise to handle the Cloudinary upload
      const uploadImage = () => {
          return new Promise((resolve, reject) => {
              cloudinary.uploader.upload_stream({
                  resource_type: 'auto',
                  use_filename: true,
                  unique_filename: false,
                  overwrite: true,
              }, (error, result) => {
                  if (error) {
                      reject(error);
                  } else {
                      resolve(result);
                  }
              }).end(req.file.buffer);  // Use the buffer instead of stream
          });
      };

      // Wait for the upload to complete
      const uploadResult = await uploadImage();

      // Create new pet entry in the database
      const newPet = new LostPetModel({
          email,
          petName,
          age,
          species,
          breed,
          gender,
          weight,
          color,
          size,
          vaccinated,
          description,
          image: uploadResult.secure_url, // Use the secure URL from Cloudinary
          state,
          city,
          mobileNo,
          energy,
      });

      const savedPet = await newPet.save();

      // Update user with the new pet reference
      const user = await UserModel.findOneAndUpdate(
          { email },
          { $push: { lostPets: savedPet._id } },
          { new: true }
      );

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({
          message: 'Pet added successfully and user updated',
          lostPet: savedPet,
          // user,
      });

  } catch (error) {
      console.error('Error adding pet:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});









app.get('/adopt', async (req, res) => {
  try {
    const pets = await PetModel.find({});
    res.status(200).json(pets);
  } catch (error) {
    console.error('Error fetching pets:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});




// GET pet details by ID
app.get('/petprofile/:id', async (req, res) => {
  const petId = req.params.id;
  console.log(petId);
  

  // Validate the ID format
  if (!mongoose.Types.ObjectId.isValid(petId)) {
      return res.status(400).json({ message: 'Invalid ID format' });
  }

  try {
      const pet = await PetModel.findById(petId);

      if (!pet) {
          return res.status(404).json({ message: 'Pet not found' });
      }

      res.status(200).json(pet);
  } catch (error) {
      console.error('Error fetching pet data:', error.message);
      res.status(500).json({ message: 'Server error' });
  }
});







// GET lostpet details by ID
app.get('/lostpetprofile/:id', async (req, res) => {
  const petId = req.params.id;
  console.log(`lost pet id ${petId}`);
  

  // Validate the ID format
  if (!mongoose.Types.ObjectId.isValid(petId)) {
      return res.status(400).json({ message: 'Invalid ID format' });
  }

  try {
      const lostPet = await LostPetModel.findById(petId);
      

      if (!lostPet) {
          return res.status(404).json({ message: 'Pet not found' });
      }

      res.status(200).json(lostPet);

  } catch (error) {
      console.error('Error fetching pet data:', error.message);
      res.status(500).json({ message: 'Server error' });
  }
});








// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
