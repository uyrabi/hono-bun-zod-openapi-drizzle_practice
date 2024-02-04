import { serial, timestamp } from 'drizzle-orm/mysql-core';

// 複数のテーブルで共通するカラムについての定義

const id = {
  id: serial('id').primaryKey().notNull(),
};

const timestamps = {
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
  deleted_at: timestamp('deleted_at'),
};

export const schemaBase = {
  ...id,
  ...timestamps,
};