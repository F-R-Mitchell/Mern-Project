import mongoose from 'mongoose'

const TaskSchema = new mongoose.Schema({
  taskName: {
    type: String,
    required: [true, 'Please provide task name'],
    maxlength: 50,
  },
  taskDescription: {
    type: String,
    required: [true, 'Please provide task description'],
    maxlength: 200,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [false, 'Please provide user'],
  },
})

export default mongoose.model('Tasks', TaskSchema)
