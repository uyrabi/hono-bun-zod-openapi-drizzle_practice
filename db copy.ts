import { drizzle } from "drizzle-orm/mysql2";
import { migrate } from "drizzle-orm/mysql2/migrator";
import mysql from "mysql2";

import * as dotenv from "dotenv";
dotenv.config({ path: '.env.development' });

console.log("\n\n\n\n")
console.log(Bun.env)
console.log("\n\n\n\n")

const dbInfo = {
    host: 'db',
    user: Bun.env.MYSQL_USER,
    password: Bun.env.MYSQL_PASSWORD,
    database: Bun.env.MYSQL_DATABASE,
};

let isConnected: boolean = false;
let connection;
let connectionURL = process.env.MYSQL_DATABASE_URL!;

// console.log("***********************")
// console.log("process.env")
// console.log(process.env)
// console.log("connectionURL")
// console.log(connectionURL)
// console.log("***********************")


const tryDBConnection = () => {
    if (isConnected) {
        console.log('にデースに接続されています。');
        return drizzle(connection); // 存の接をす
    }
    for (let attempt = 1; attempt <= 100; attempt++) {
        console.log(`デースに接に行します。 ${attempt}目`);
        console.log("connectionURL: ", connectionURL)
        try {
            connection = mysql.createPool(connectionURL);
            const dbConnection = drizzle(connection);
            console.log('デースの接に成功しました。');
            isConnected = true; //成功時にフラグをtrueに定
            return dbConnection;
        } catch (error) {
            console.log(`接行 ${attempt}目に失しました。`, error);
            if (attempt === 30) {
                console.log('デースの接に失しました。');
                throw new Error('デースの接に失しました。');
            }
            new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
};

const init = () => {
    try {
        const dbConnection = tryDBConnection();
        migrate(dbConnection, { migrationsFolder: "drizzle/migrations" });
        return dbConnection;
    } catch (error) {
        console.error('デースの初期化中にエラーが生しました。', error);
    } finally {
        // if (connection) {
        //     connection.end();
        //     console.log('デース接をじました。');
        // }
    }
};

export const db = init();

export default db;