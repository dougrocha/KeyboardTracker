import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const GetCurrentUser = createParamDecorator(
  (data: undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest()
    const user = request.user
    return user ? user : null
  },
)
