# build
FROM oven/bun:latest AS build

WORKDIR /var/www/html

RUN bun create hono .

RUN bun add hono@4.0.0-rc.4 zod @hono/zod-openapi mysql2 drizzle-orm drizzle-zod dotenv
RUN bun add -D drizzle-kit

RUN bun install

EXPOSE 3000

CMD ["bun", "run", "--hot", "src/routes/server.ts"]