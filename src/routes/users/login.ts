// import 'bun:dotenv';
import { createRoute, OpenAPIHono } from '@hono/zod-openapi';
import { ErrorSchema } from '@/schemas/responses/common/errors';
import { UserPostRequestSchema } from '@/schemas/requests/users/post';
import { UserPostResponseSchema } from '@/schemas/responses/users/post';

const openApiRoute = new OpenAPIHono();

const userPostRoute = createRoute({
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
          schema: UserPostResponseSchema,
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

openApiRoute.openapi(userPostRoute, async (c) => {
    console.log(c.req);
    const  body = await c.req.parseBody();
    // const { password } = input;
    // console.log("hogehogehogxxxxxxxxxeaaa")
    return await c.json({
      paqqqRssword: 'qqqqqqqqqqqq',
    })
  })

export { userPostRoute };