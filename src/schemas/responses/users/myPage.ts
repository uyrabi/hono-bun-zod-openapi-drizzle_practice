import { z } from '@hono/zod-openapi'
import { User } from '@/schemas/models/user';

const UserMyPageResponseSchema = User.selectSchema.pick(
  { id: true, email: true, name: true }
);

export { UserMyPageResponseSchema };