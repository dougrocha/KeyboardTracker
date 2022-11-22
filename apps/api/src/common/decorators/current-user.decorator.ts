import { createParamDecorator, ExecutionContext } from '@nestjs/common'

/**
 * Get the current user from the request
 * @param data {boolean} Whether to include the password in the user object
 * @returns {User} The current user
 */
export const GetCurrentUser = createParamDecorator(
  (data: { password?: boolean }, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest()
    const user = request.user
    return data?.password === true ? user : { ...user, password: undefined }
  },
)
