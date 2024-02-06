// ファイル名をindex.tsとしておくと、import exportで以下のようにできる
// 例) import { userApi } from './routes/users';

import { createRoute, OpenAPIHono } from '@hono/zod-openapi';
import { getCookie, setCookie } from 'hono/cookie'

export default createRoute((c) => {
    const name = getCookie(c, 'name') ?? 'no name'
    return c.json({ name })
})