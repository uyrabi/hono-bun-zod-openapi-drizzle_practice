import type { Config } from "drizzle-kit";

export default {
  schema: "./src/schemas/db/tables/*.ts",
  out: "./drizzle/migrations",
  driver: 'd1',
  dbCredentials: {
    wranglerConfigPath: "wrangler.toml",
    dbName: "hono-db",
  }
} satisfies Config;