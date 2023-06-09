import express from 'express'

const jobsRouter = express.Router()
import {
  createJob,
  getAllJobs,
  updateJob,
  deleteJob,
  showStats,
} from '../controllers/jobsController.js'
import {
  createTask,
  deleteTask,
  getAllTasks,
  updateTask,
} from '../controllers/taskController.js'
import authenticateUser from '../middleware/auth.js'
import testUser from '../middleware/testUser.js'

jobsRouter.route('/').post(testUser, createJob).get(getAllJobs)

jobsRouter.route('/stats').get(authenticateUser, showStats)

jobsRouter.route('/:id').delete(testUser, deleteJob).patch(testUser, updateJob)

jobsRouter.route('/misc').post(testUser, createTask).get(getAllTasks)
jobsRouter.route('/misc/:id').delete(testUser, deleteTask).patch(testUser, updateTask)

export default jobsRouter
