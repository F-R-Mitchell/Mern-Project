import express from 'express'
const authRouter = express.Router()
import {
  register,
  login,
  updateUser,
  getCurrentUser,
  logout,
} from '../controllers/authController.js'
import authenticateUser from '../middleware/auth.js'
import rateLimiter from 'express-rate-limit'
import testUser from '../middleware/testUser.js'

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: 'Too many requests from this IP, please try again in an hour',
})

authRouter.route('/register').post(apiLimiter, register)
authRouter.route('/login').post(apiLimiter, login)
authRouter.route('/logout').get(logout)
authRouter.route('/updateUser').patch(authenticateUser, testUser, updateUser)
authRouter.route('/getCurrentUser').get(authenticateUser, getCurrentUser)

export default authRouter
