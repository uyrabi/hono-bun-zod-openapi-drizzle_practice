import { OpenAPIHono } from '@hono/zod-openapi'
import { userRoute } from "./users/mypage";
import { userPostRoute } from "./users/login";

const app = new OpenAPIHono()

app.openapi(userRoute, (c) => {
  const { id } = c.req.valid('param')
  return c.json({
    id,
    age: 20,
    name: 'Ultra-man:' + Bun.env.TEST_ENV,
  })
})

app.openapi(userPostRoute, async (c) => {
  const body = await c.req.valid('json');
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