# build
FROM oven/bun:latest AS build

WORKDIR /app

RUN bun create hono .

RUN bun add hono zod @hono/zod-openapi postgres drizzle-orm drizzle-zod
RUN bun add -D drizzle-kit

RUN bun install

USER bun
EXPOSE 3000

CMD ["bun", "run", "--hot", "src/routes/server.ts"]