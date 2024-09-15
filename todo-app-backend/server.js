const express = require('express'); // Importing Express
const mongoose = require('mongoose'); // Importing Mongoose for MongoDB
require('dotenv').config(); // Importing dotenv to manage environment variables
const Task = require('./models/Task');
const { protect } = require("./middleware/authMiddleware")
const cors = require('cors');




mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

const User = require('./models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const app = express(); // Initializing an Express application
// List of allowed origins (development and production domains)
const allowedOrigins = [
    'http://localhost:3000',   // For local development (React on localhost)
    'https://your-vercel-app.vercel.app',  // Replace with your Vercel frontend URL
  ];
  
  // CORS configuration
  app.use(cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,  // Allows cookies and HTTP authentication
  }));

// Function to generate a JWT token

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn : '30d',
    }) ; // Token expires in 30 days
};

// Middleware to parse JSON data sent by the client
app.use(express.json());


// Sign up route 

app.post('/api/users/signup', async(req,res) => {
    const {username, email, password } = req.body ;

    try {
        const userExists = await User.findOne({email});
        if(userExists) {
            return res.status(400).json({
                message: "user already exists "
            });
        }
        const user = new User({username, email, password });
        await user.save();
        console.log('User saved:', user);

        res.status(201).json({
            _id: user._id, 
            username: user.username, 
            email:user.email, 
            token : generateToken(user._id),
        });

    } catch(error){
        res.status(400).json({message: error.message });
    }
});

// sign in route

app.post('/api/users/signin', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (user && (await user.matchPassword(password))) {
        res.json({
          _id: user._id,
          username: user.username,
          email: user.email,
          token: generateToken(user._id),
        });
      } else {
        res.status(400).json({ message: 'Invalid email or password' });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });


// A simple route to test if the server is working
app.get('/', (req, res) => {
  res.send('Welcome to the To-Do App Backend');
});

// Set up the server to listen on a specific port
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});




// Route to Create a new Task (POST /api/tasks )
// this route is protected, so the user must be logged in 

app.post('/api/tasks', protect, async (req, res ) => {
    const { title, description } = req.body; 
    try {
        // create a new task using the task model 

        const task = new Task({
            user: req.user._id, 
            title, description, 
        }) ; 

        // save the task to the database 
        const savedTask = await task.save(); 
        res.status(201).json(savedTask);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}); 

//////////////////
// Route to get all the tasks for the logged-in user 
// this route is protected, so the user must be logged in 
///////////////////

app.get('/api/tasks', protect, async(req, res) => {
    try {
        // Find all the tasks that belong to the logged in user 
        const tasks =  await Task.find({ user: req.user._id});

        // send the tasks back as the response 

        res.json(tasks);

    } catch (error ) {
        res.status(500).json({ message : error.message}) ; 
    }
})

/////////////////////////
// Route to update a tasks 
// This route is protected, so the user must be logged in 
///////////////////////////


app.put("/api/tasks/:id", protect, async (req, res) => {
    const { title, description, status} = req.body ; 
     try{
        // Find the task by its ID and make sure the task belongs to the logged in user 
        let task = await Task.findOne({_id : req.params.id, user: req.user._id});

        if (!task){
            return res.status(404).json({message: "task not found "});
        }
        // update the task detailsnif needed with the new values given
            // Update the task fields with new values (only if provided)
    if (title) task.title = title;  // Update the title if provided
    if (description) task.description = description;  // Update the description if provided
    if (status) task.status = status;  // Update the status if provided
        const updatedTask = await task.save();

        // send the updated task as the response. 
        res.json(updatedTask); 
    } catch (error){
        res.status(500).json({ message: error.message}); 
    }
}); 

// Route to delete the tasks
// this route is protected, so the user must be logged in 

app.delete("/api/tasks/:id", protect, async (req, res) => {
    try { 
        // find the task by its id and make sure the task belongs to the logged in user

        const task = await Task.findOne({ _id: req.params.id, user : req.user._id}); 

        if(!task) {
            return res.status(404).json({ message : "task not found"});
        }

        // Delete the task from the database 

        await task.deleteOne({ _id : req.params.id});

        // send the success message as the response

        res.json({message: 'task removed '}); 
    } catch (error ){
        res.status(500).json({ message: error.message }) ; 
    }
}) ; 

module.exports = app;