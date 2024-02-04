console.log("------ Bun.env--------")

import { OpenAPIHono } from '@hono/zod-openapi'
import { eq } from 'drizzle-orm';
import { userMyPageRoute } from "./users/myPage";
import { userLoginRoute } from "./users/login";

import { User } from '@/schemas/models/user';

import { userTable } from '@/schemas/db/tables/user';

import { db } from 'db';

const app = new OpenAPIHono();

app.openapi(userMyPageRoute, async (c) => {
  console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
  const id = c.req.valid('param')
  console.log("\n\nc.env:\n\n", c.env)
  // console.log("\n\nenv:\n\n", c.env.DB)

  const username = `taro_${new Date().getMinutes()}_${new Date().getSeconds()}`;
  const newUserValues = {
    username: username,
    email: `${username}@foobar.com`,
    password: '1234abcd',
    created_at: new Date(), // 現在の日時をISO形式の文字列で設定
    updated_at: new Date()  // 現在の日時をISO形式の文字列で設定
  };
  console.log("newUserValues:", newUserValues);
  const parsedData = User.insertSchema.safeParse(newUserValues);
  console.log("parsedData:", parsedData);
  if (!parsedData.success) {
    console.log("validation errors:", parsedData.error);
  }
  console.log('start insert...');
  const newUserResult = await db.insert(userTable).values(newUserValues);
  const newUserId = newUserResult[0].insertId;
  const newUser = await db.select().from(userTable).where(eq(userTable.id, newUserId));
  console.log('newUserId:', newUserId);
  // const newUser = User.create(newUserValues, c);


  console.log("User:", User);
  console.log("newUserResult[0]:", newUserResult[0]);
  const result = await db.select(userTable).from(userTable);
  console.log("users:", result);

  return c.json(newUser);

  // return c.json({
  //   id,
  //   age: 20,
  //   name: 'Ultra-man:'
  // })
})

app.openapi(userLoginRoute, async (c) => {
  const { id, email, username } = await c.req.json().valid('json');
  return c.json({
    password: "c.req only\n",
  })
})

// The OpenAPI documentation will be available at /doc
app.doc('/doc', {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'My API',
  },
})

export default app;