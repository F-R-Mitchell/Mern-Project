import { BadRequestError, NotFoundError } from '../errors/index.js'
import Tasks from '../models/Task.js'
import { StatusCodes } from 'http-status-codes'
import checkPermissions from '../utils/checkPermissions.js'

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

export const updateTask= async (req, res) => {
  const { id: taskId } = req.params
  const { taskName, taskDescription } = req.body
  if (!taskName || !taskDescription) {
    throw new BadRequestError('Please provide all values')
  }

  const task = await Tasks.findOne({ _id: taskId })
  if (!task) {
    throw new NotFoundError('Job not found')
  }

  checkPermissions(req.user, task.createdBy)

  const updatedTask = await Tasks.findOneAndUpdate({ _id: taskId }, req.body, {
    new: true,
    runValidators: true,
  })
  res.status(StatusCodes.OK).json({ updatedTask })
}

export const deleteTask = async (req, res) => {
  const { id: taskId } = req.params
  const task = await Tasks.findOne({ _id: taskId })

  if (!task) {
    throw new NotFoundError(`Task ${taskId} not found`)
  }
  checkPermissions(req.user, task.createdBy)
  const deletedTask = await Tasks.findOneAndDelete({ _id: taskId }, req.body, {
    new: true,
    runValidators: true,
  })
  res.status(StatusCodes.OK).json({ deletedTask, msg: 'Success! Task removed' })
}
