// import 'bun:dotenv';
import { createRoute, OpenAPIHono } from '@hono/zod-openapi'
import { UserMyPageResponseSchema } from '@/schemas/responses/users/myPage';
import { UserMyPageRequestSchema } from '@/schemas/requests/users/myPage';

const openApiRoute = new OpenAPIHono();

const userMyPageRoute = createRoute({
  method: 'get',
  path: '/users/{id}',
  request: {
    params: UserMyPageRequestSchema,
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: UserMyPageResponseSchema,
        },
      },
      description: 'Retrieve the user',
    },
  },
})

openApiRoute.openapi(userMyPageRoute, (c) => {
  const id = c.req.valid('param');
  const email = "test@hoge.com";
  const username = "testuser";
  console.log("hogehogehogeaaa")
  return c.json({
    id,
    email,
    username
  })
})

export { userMyPageRoute };