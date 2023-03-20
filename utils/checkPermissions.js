import { UnauthenticatedError } from '../errors/index.js'

const checkPermissions = (requestUser, resourceUserId) => {
  if (requestUser.userId === String(resourceUserId)) {
    return
  }
  throw new UnauthenticatedError('Not Authorized to Access this Route')
}

export default checkPermissions
