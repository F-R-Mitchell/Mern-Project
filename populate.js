import { readFile } from 'fs/promises'
import dotenv from 'dotenv'
dotenv.config()
import connectDB from './db/connect.js'
import Job from './models/Job.js'

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
    let jsonProducts = JSON.parse(
      await readFile(new URL('./MOCK_DATA.json', import.meta.url))
    )
    jsonProducts = jsonProducts.map((item) => {
      return {
        company: item.company,
        position: item.position,
        status: item.status,
        jobType: item.jobType,
        jobLocation: item.jobLocation,
        createdBy: item.createdBy,
        createdAt: item.createdAt,
        salary: parseInt(item.salary) ? parseInt(item.salary) : item.salary,
      }
    })
      console.log(jsonProducts)
    await Job.create(jsonProducts)
    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

start()
