import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const GetCurrentUser = createParamDecorator(
  (data: undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest()

    const { id, ...user } = request.user

    return data ? user?.[data] : user
  },
)
