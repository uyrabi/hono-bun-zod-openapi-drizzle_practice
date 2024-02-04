// import 'bun:dotenv';
import { createRoute, OpenAPIHono } from '@hono/zod-openapi';
import { ErrorSchema } from '@/schemas/responses/common/errors';
// import { UserLoginRequestSchema } from '@/schemas/requests/users/login';
import { UserLoginResponseSchema } from '@/schemas/responses/users/login';

const openApiRoute = new OpenAPIHono();

const userLoginRoute = createRoute({
  method: 'post',
  path: '/users/post',
  // request: {
  //   body: {
  //       description: 'The user password',
  //       content: {
  //         'application/json': {
  //           schema: UserPostRequestSchema,
  //         },
  //       },
  //   },
  // },
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

openApiRoute.openapi(userLoginRoute, async (c) => {
    console.log(c.req);
    const { id } = await c.req.json().valid('json');
    // const { password } = input;
    // console.log("hogehogehogxxxxxxxxxeaaa")
    return await c.json({
      id,
    })
  })

export { userLoginRoute };