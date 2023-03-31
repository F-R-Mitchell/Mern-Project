import 'express-async-errors'
import express from 'express'
const app = express()
import errorHandlerMiddleware from './middleware/error-handler.js'
import notFoundMiddleware from './middleware/not-found.js'
import dotenv from 'dotenv'
dotenv.config()
import authRouter from './routes/authRoutes.js'
import jobsRouter from './routes/jobsRoutes.js'
// import newsRouter from './routes/newsRoutes.js'

import { dirname } from 'path'
import { fileURLToPath } from 'url'
import path from 'path'

import helmet from 'helmet'
import xss from 'xss-clean'
import mongoSanitize from 'express-mongo-sanitize'
import cookieParser from 'cookie-parser'

import connectDB from './db/connect.js'
import authenticateUser from './middleware/auth.js'
import morgan from 'morgan'

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))
}

const __dirname = dirname(fileURLToPath(import.meta.url))
app.use(express.static(path.resolve(__dirname, './client/build')))

app.use(express.json())
app.use(cookieParser())
app.use(helmet())
app.use(xss())
app.use(mongoSanitize())

app.get('/', (req, res) => {
  res.send('Welcome')
})

app.get('/api/v1', (req, res) => {
  res.json({ msg: 'API' })
})

app.use('/api/v1/auth', authRouter)

app.use('/api/v1/jobs', authenticateUser, jobsRouter)

// app.use('/api/v1/news', newsRouter)

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build', 'index.html'))
})

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
    app.listen(port, () => {
      console.log('server is listening on port ' + port)
    })
  } catch (error) {
    console.log('There is an error!:', error)
  }
}
start()
