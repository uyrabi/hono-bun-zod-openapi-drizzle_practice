// import 'bun:dotenv';
import { createRoute, OpenAPIHono } from '@hono/zod-openapi';
import { ErrorSchema } from '@/schemas/responses/common/errors';
// import { UserLoginRequestSchema } from '@/schemas/requests/users/login';
import { UserLoginResponseSchema } from '@/schemas/responses/users/login';

const loginRoute = createRoute({
  method: 'post',
  path: '/login',
  responses: {
    200: {
      content: {
        'application/json': {
          schema: UserLoginResponseSchema,
        },
      },
      description: 'Retrieve the user',
    },
    400: {
      description: 'Bad Request',
      content: {
        'application/json': {
          schema: ErrorSchema,
        },
      }
    },
  },
})

const loginHandler = async (c) => {
  const { id, email, username } = await c.req.json().valid('json');
  return c.json({
    password: "c.req only\n",
  })
};

export { loginRoute, loginHandler };