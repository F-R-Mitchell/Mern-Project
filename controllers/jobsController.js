import { BadRequestError, NotFoundError } from '../errors/index.js'
import Job from '../models/Job.js'
import { StatusCodes } from 'http-status-codes'
import checkPermissions from '../utils/checkPermissions.js'
import mongoose from 'mongoose'
import moment from 'moment'

export const createJob = async (req, res) => {
  const { position, company } = req.body
  if (!position || !company) {
    throw new BadRequestError('Please provide all values')
  }
  req.body.createdBy = req.user.userId
  const job = await Job.create(req.body)
  res.status(StatusCodes.CREATED).json({ job })
}

export const getAllJobs = async (req, res) => {
  const { search, status, jobType, sort, minSalary, maxSalary } = req.query

  const queryObject = {
    createdBy: req.user.userId,
  }
  if (status) {
    queryObject.status = status
  }
  if (jobType && jobType !== 'all') {
    queryObject.jobType = jobType
  }
  if (search) {
    queryObject.position = { $regex: search, $options: 'i' }
  }
  if (minSalary || maxSalary) {
    queryObject.$and = [
      {
        $and: [
          {
            salary: {
              $gte: minSalary || 10000,
            },
          },
          {
            salary: {
              $lte: maxSalary || 100000,
            },
          },
        ],
      },
    ]
  }

  let result = Job.find(queryObject)

  if (sort === 'latest') {
    result = result.sort('-createdAt')
  }
  if (sort === 'oldest') {
    result = result.sort('createdAt')
  }
  if (sort === 'a-z') {
    result = result.sort('position')
  }
  if (sort === 'z-a') {
    result = result.sort('-position')
  }

  const limit = Number(req.query.limit) || 10
  const page = Number(req.query.page) || 1
  const skip = (page - 1) * limit
  result = result.skip(skip).limit(limit)
  const jobs = await result
  const totalJobs = await Job.countDocuments(queryObject)
  const numOfPages = Math.ceil(totalJobs / limit)

  res
    .status(StatusCodes.OK)
    .json({ jobs, totalJobs: totalJobs, numOfPages: numOfPages })
}

export const updateJob = async (req, res) => {
  const { id: jobId } = req.params
  const { company, position } = req.body
  if (!company || !position) {
    throw new BadRequestError('Please provide all values')
  }

  const job = await Job.findOne({ _id: jobId })
  if (!job) {
    throw new NotFoundError('Job not found')
  }

  checkPermissions(req.user, job.createdBy)

  const updatedJob = await Job.findOneAndUpdate({ _id: jobId }, req.body, {
    new: true,
    runValidators: true,
  })

  res.status(StatusCodes.OK).json({ updatedJob })
}
export const deleteJob = async (req, res) => {
  const { id: jobId } = req.params

  const job = await Job.findOne({ _id: jobId })

  if (!job) {
    throw new NotFoundError(`No job with id : ${jobId}`)
  }

  checkPermissions(req.user, job.createdBy)

  const deletedJob = await Job.findOneAndDelete({ _id: jobId }, req.body, {
    new: true,
    runValidators: true,
  })
  res.status(StatusCodes.OK).json({ deletedJob, msg: 'Success! Job removed' })
}
export const showStats = async (req, res) => {
  let stats = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ])

  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr
    acc[title] = count
    return acc
  }, {})
  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  }
  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
        count: { $sum: 1 },
      },
    },
    { $sort: { '_id.year': -1, '_id.month': -1 } },
    { $limit: 6 },
  ])

  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item
      const data = moment()
        .month(month - 1)
        .year(year)
        .format('MMM Y')
      return { data, count }
    })
    .reverse()
  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications })
}
