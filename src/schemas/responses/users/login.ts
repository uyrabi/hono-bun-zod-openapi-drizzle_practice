import { z } from '@hono/zod-openapi'
import { User } from '@/schemas/models/user';

const UserLoginResponseSchema = User.selectSchema.pick(
  { id: true, email: true, username: true }
).openapi('User');

export { UserLoginResponseSchema };