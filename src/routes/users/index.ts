// ファイル名をindex.tsとしておくと、import exportで以下のようにできる
// 例) import { userApi } from './routes/users';

import { OpenAPIHono } from '@hono/zod-openapi';

import { loginRoute, loginHandler } from './login';
import { myPageRoute, myPageHandler } from './myPage';

export const userApi = new OpenAPIHono();

userApi.openapi(loginRoute, loginHandler);
userApi.openapi(myPageRoute, myPageHandler);