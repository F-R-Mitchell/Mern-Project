import { BadRequestError } from '../errors/index.js'
import Tasks from '../models/Task.js'
import { StatusCodes } from 'http-status-codes'

export const createTask = async (req, res) => {
  const { taskName, taskDescription } = req.body
  if (!taskName || !taskDescription) {
    throw new BadRequestError('Please provide all values')
  }
  req.body.createdBy = req.user.userId
  const task = await Tasks.create(req.body)
  res.status(StatusCodes.CREATED).json({ task })
}

export const getAllTasks = async (req, res) => {
  const queryObject = {
    createdBy: req.user.userId,
  }
  let result = Tasks.find(queryObject)
  const tasks = await result
  res.status(StatusCodes.OK).json({ tasks })
}
