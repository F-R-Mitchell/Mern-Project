import express from 'express'

const jobsRouter = express.Router()
import {
  createJob,
  getAllJobs,
  updateJob,
  deleteJob,
  showStats,
} from '../controllers/jobsController.js'
import authenticateUser from '../middleware/auth.js'
import testUser from '../middleware/testUser.js'

jobsRouter.route('/').post(testUser, createJob).get(getAllJobs)

jobsRouter.route('/stats').get(authenticateUser, showStats)

jobsRouter.route('/:id').delete(testUser, deleteJob).patch(testUser, updateJob)

export default jobsRouter
