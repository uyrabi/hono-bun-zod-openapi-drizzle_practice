import { z } from '@hono/zod-openapi'
import { User } from '@/schemas/models/user';

const UserLoginRequestSchema = User.selectSchema.pick(
  { email: true, password: true }
  ).openapi('User');

export { UserLoginRequestSchema };