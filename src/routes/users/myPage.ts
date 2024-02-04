// import 'bun:dotenv';
import { createRoute, OpenAPIHono } from '@hono/zod-openapi'
import { UserMyPageResponseSchema } from '@/schemas/responses/users/myPage';
import { UserMyPageRequestSchema } from '@/schemas/requests/users/myPage';

import { User } from '@/schemas/models/user';

import { userTable } from '@/schemas/db/tables/user';

import { eq } from 'drizzle-orm';
import { db } from 'db';

const myPageRoute = createRoute({
  method: 'get',
  path: '/:id',
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

const myPageHandler = async (c) => {
  console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
  const id = c.req.valid('param')

  const username = `taro_${new Date().getMinutes()}_${new Date().getSeconds()}`;
  const newUserValues = {
    username: username,
    email: `${username}@foobar.com`,
    password: '1234abcd',
    created_at: new Date(),
    updated_at: new Date()
  };
  console.log("newUserValues:", newUserValues);
  const parsedData = User.insertSchema.safeParse(newUserValues);
  console.log("parsedData:", parsedData);
  if (!parsedData.success) {
    console.log("validation errors:", parsedData.error);
  }
  console.log('start insert...');
  // const newUserResult = await db.insert(userTable).values(newUserValues);
  const newUserResult = await User.create(newUserValues);
  const newUserId = newUserResult[0].insertId;
  const newUser = await db.select().from(userTable).where(eq(userTable.id, newUserId));
  console.log('newUserId:', newUserId);
  const newUserFind = await User.find(newUserId);
  console.log('newUserFind:', newUserFind)


  console.log("User:", User);
  console.log("newUserResult[0]:", newUserResult[0]);

  return c.json(newUser);

  // return c.json({
  //   id,
  //   age: 20,
  //   name: 'Ultra-man:'
  // })
};

export { myPageRoute, myPageHandler };