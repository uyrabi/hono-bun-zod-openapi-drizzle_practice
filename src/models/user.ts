////TODO:生成AIに渡してコードを書かせる為のテンプレートファイルを実装する
// 例）models/sample.ts
// スキーマファイルとモデルファイルのサンプルをCursorに投げるとコードを出力する
// 生成AIのzod-openapiなどの学習が進めば不要になる？

// import { mysqlTable, MySqlTableWithColumns } from 'drizzle-orm/mysql-core';
// import { createInsertSchema, createSelectSchema } from "drizzle-zod";

// // Zodスキーマの定義
// const userTable = mysqlTable('user', {}
// const UserSchema = createSelectSchema(userable);

// // ZodスキーマからTypeScriptの型を導出
// type User = z.infer<typeof UserSchema>;

// // このUser型は以下のようになります:
// // type User = {
// //   id: number;
// //   name: string;
// //   email: string;
// // }import { z } from 'zod';