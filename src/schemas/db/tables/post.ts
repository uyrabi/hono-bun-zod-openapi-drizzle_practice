import { mysqlTable, int, varchar, text } from 'drizzle-orm/mysql-core';
import { schemaBase } from '../commonColumns';

export const postTable = mysqlTable('post', {
  ...schemaBase,
  title: varchar('title', { length: 256 }).notNull(),
  body: text('body').notNull(),
  user_id: int('user_id').notNull(),
});
