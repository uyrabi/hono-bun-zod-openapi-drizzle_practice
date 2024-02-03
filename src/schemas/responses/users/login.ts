import { z } from '@hono/zod-openapi'

const UserPostResponseSchema = z.object({
    password: z
      .string()
      .min(4)
      .max(16),
    })

export { UserPostResponseSchema };