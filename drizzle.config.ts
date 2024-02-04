import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config();

console.log("===== drizzle.config.ts =====")

console.log(process.env)

export default {
  schema: "./src/schemas/db/tables/*.ts",
  out: "./drizzle/migrations",
  dbCredentials: {
    uri: process.env.DATABASE_URL,
  }
} satisfies Config;