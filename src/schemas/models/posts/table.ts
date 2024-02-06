import { mysqlTable, int, varchar, text } from 'drizzle-orm/mysql-core';

// テーブルのスキーマ定義
// 以下のベースになる
// マイグレーションファイル　Zodスキーマ　型定義

export const tableSchema = mysqlTable('post', {
    title: varchar('title', { length: 256 }).notNull(),
    body: text('body').notNull(),
    user_id: int('user_id').notNull(),
});
