import { drizzle, MySql2Driver } from "drizzle-orm/mysql2";
import { migrate } from "drizzle-orm/mysql2/migrator";
import mysql from "mysql2/promise";

import * as dotenv from "dotenv";
dotenv.config({ path: '.env.development' });

const dbInfo = {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

console.log("=====================================")
console.log("dbInfo:", dbInfo)
console.log("=====================================")

console.log("=====================================")
console.log("Start connecting to the database..")

const connection = mysql.createPool(dbInfo);

console.log("completed connection to the database.")

// console.log("connection result:", connection)

console.log("=====================================")

console.log("=====================================")
console.log("Start drizzle..")

export const db = drizzle(connection);

console.log("completed drizzle.")

// console.log("db:", db)

// マイグレーションファイルを実行
// すぐ実行するとエラーが発生することがあるため、最大30回までリトライする

for (let attempt = 1; attempt <= 30; attempt++) {
    try {
        await new Promise(resolve => setTimeout(resolve, 1000)); // 1秒待機
        console.log("=====================================")
        console.log(`マイグレーションファイルを実行.. 試行回数: ${attempt}`);
        const migrationResult = await migrate(db, { migrationsFolder: "drizzle/migrations" });

        console.log("completed exec migration.")

        console.log("migrationResult:", migrationResult);
        console.log("=====================================")

        break; // 成功したらループを抜ける
    } catch (error) {
        console.error("=====================================")
        console.error(`DB Init error on attempt ${attempt}:`, error)
        console.error("=====================================")
        if (attempt === 30) {
            console.error("最大試行回数に達しました。マイグレーションに失敗しました。")
            break;
        }
    }
}