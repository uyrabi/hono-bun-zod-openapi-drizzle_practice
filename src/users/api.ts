import { createRoute, OpenAPIHono } from '@hono/zod-openapi'
import { UserSchema } from '../schemas/models/user';
import { UserParamsSchema } from '../schemas/requests/users/user';

const openapiRoute = new OpenAPIHono();

const userRoute = createRoute({
  method: 'get',
  path: '/users/{id}',
  request: {
    params: UserParamsSchema,
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: UserSchema,
        },
      },
      description: 'Retrieve the user',
    },
  },
})

openapiRoute.openapi(userRoute, (c) => {
    const { id } = c.req.valid('param')
    console.log("hogehogehogeaaa")
    return c.json({
      id,
      age: 20,
      name: 'Ultra-man',
    })
  })

export { userRoute };