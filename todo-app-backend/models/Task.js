const mongoose = require('mongoose'); // Import Mongoose to interact with MongoDB

// Define the schema (blueprint) for a task
const TaskSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId,  // Store the ID of the user who created the task
    ref: 'User', // Reference the 'User' model (so we know which user owns this task)
    required: true, // The task must belong to a user
  },
  title: {
    type: String,  // The title of the task (a brief description)
    required: true, // The title is required
  },
  description: {
    type: String,  // An optional longer description of the task
  },
  status: {
    type: String,  // The task can be either 'incomplete' or 'complete'
    default: 'incomplete', // By default, tasks are incomplete
  },
  createdAt: {
    type: Date,  // Store when the task was created
    default: Date.now, // Automatically set the creation time
  },
});

// Export the Task model so we can use it in other files
module.exports = mongoose.model('Task', TaskSchema);
