import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.development" });

console.log("=====================================");
console.log(process.env);

export default {
  schema: "./src/schemas/db/tables/*.ts",
  out: "./drizzle/migrations",
  driver: "mysql2",
  dbCredentials: {
    uri: process.env.MYSQL_DATABASE_URL,
  }
} satisfies Config;