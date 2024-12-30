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
// const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/UsersData';
const MONGODB_URL = process.env.MONGODB_URL ||"mongodb+srv://shubhamishra663:Shubham123@cluster0.6anog.mongodb.net/adopt-a-love?retryWrites=true&w=majority&appName=Cluster0";

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
    const user = await UserModel.findById(req.user.id);
    console.log(user);
    
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({
      message: `Welcome, ${user.name}`,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        mobileNo:user.mobileNo,
        cover_img:user.cover_img,
        profile_img:user.profile_img
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
  const {
    email, ownerName, petName, age, species, breed, gender, weight, color,
    size, vaccinated, description, state, city, mobileNo, energy, type
  } = req.body;

  try {
    // Ensure image is available before attempting to upload
    if (!req.file) {
      return res.status(400).json({ message: 'No image uploaded' });
    }

    // Create a promise to handle the Cloudinary upload
    const uploadImage = () => {
      return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            resource_type: 'auto',
            folder: 'Pets', // Specify the folder name
            use_filename: true,
            unique_filename: false,
            overwrite: true,
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        ).end(req.file.buffer); // Use the buffer instead of stream
      });
    };

    // Wait for the upload to complete
    const uploadResult = await uploadImage();

    // Create new pet entry in the database
    const newPet = new PetModel({
      email,
      ownerName,
      petName,
      type,
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
  const {
    email, ownerName, petName, age, species, breed, gender, weight, color,
    size, vaccinated, description, state, city, mobileNo, energy, type
  } = req.body;

  try {
    // Ensure image is available before attempting to upload
    if (!req.file) {
      return res.status(400).json({ message: 'No image uploaded' });
    }

    // Create a promise to handle the Cloudinary upload
    const uploadImage = () => {
      return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            resource_type: 'auto',
            folder: 'LostPets', // Specify the folder name
            use_filename: true,
            unique_filename: false,
            overwrite: true,
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        ).end(req.file.buffer); // Use the buffer instead of stream
      });
    };

    // Wait for the upload to complete
    const uploadResult = await uploadImage();

    // Create new pet entry in the database
    const newPet = new LostPetModel({
      email,
      ownerName,
      petName,
      type,
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
      message: 'Lost pet added successfully and user updated',
      lostPet: savedPet,
    });

  } catch (error) {
    console.error('Error adding lost pet:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});






// Profile Edit Route
app.post("/profile-edit", verifyToken,
  upload.fields([
    { name: "profile_img", maxCount: 1 },
    { name: "cover_img", maxCount: 1 },
  ]),  
  async (req, res) => {
    console.log("profile Edit");

    try {
      const { name, mobileNo } = req.body;

      // Find the user by email
      const user = await UserModel.findById(req.user.id);
    
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Helper function for Cloudinary upload
      const uploadToCloudinary = async (fileBuffer, folderName, fileName) => {
        return new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            {
              resource_type: "auto",
              folder: folderName,
              public_id: fileName,
              use_filename: true,
              overwrite: true,
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result.secure_url);
            }
          ).end(fileBuffer);
        });
      };

      // Upload profile image if provided
      let profileImgUrl = user.profile_img; // Retain existing profile image
      if (req.files.profile_img) {
        const profileImgBuffer = req.files.profile_img[0].buffer;
        profileImgUrl = await uploadToCloudinary(
          profileImgBuffer,
          "user_profiles",
          `profile_${user._id}`
        );
      }

      // Upload cover image if provided
      let coverImgUrl = user.cover_img; // Retain existing cover image
      if (req.files.cover_img) {
        const coverImgBuffer = req.files.cover_img[0].buffer;
        coverImgUrl = await uploadToCloudinary(
          coverImgBuffer,
          "user_covers",
          `cover_${user._id}`
        );
      }

      // Update user details in the database
      user.name = name || user.name;
      user.mobileNo = mobileNo || user.mobileNo;
      user.profile_img = profileImgUrl;
      user.cover_img = coverImgUrl;

      const updatedUser = await user.save();

      res.status(200).json({
        message: "Profile updated successfully",
        user: updatedUser,
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);








app.get('/adopt', async (req, res) => {
  try {
    // Fetch data from both models concurrently
    const [pets, lostPets] = await Promise.all([
      PetModel.find({}),
      LostPetModel.find({}),
    ]);

    // Combine the results
    const combinedData = {
      pets,
      lostPets,
    };

    res.status(200).json(combinedData);
  } catch (error) {
    console.error('Error fetching data:', error);
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
      console.log(lostPet);
      

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
