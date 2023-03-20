import { UnauthenticatedError } from '../errors/index.js'
import jwt from 'jsonwebtoken'

UnauthenticatedError
const auth = async (req, res, next) => {
  const token = req.cookies.token
  if (!token) {
    throw new UnauthenticatedError('Authentication Invalid')
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    const testUser = payload.userId === '64147fee127292b11d05c359'
    req.user = { userId: payload.userId, testUser }
    next()
  } catch (error) {
    throw new UnauthenticatedError('Authentication Invalid')
  }
}

export default auth
