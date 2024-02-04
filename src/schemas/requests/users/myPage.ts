import { z } from '@hono/zod-openapi'

const UserMyPageRequestSchema = z.object({
  id: z
    .string()
    .min(3)
    .openapi({
      param: {
        name: 'id',
        in: 'path',
      },
      example: '1212121',
    }),
})

export { UserMyPageRequestSchema };