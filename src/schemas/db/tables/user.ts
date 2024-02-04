import { mysqlTable, varchar } from 'drizzle-orm/mysql-core';
import { schemaBase } from '../commonColumns';

export const userTable = mysqlTable('user', {
  ...schemaBase,
  email: varchar('email', { length: 64 }).notNull().unique(),
  password: varchar('password', { length: 16 }).notNull(),
  username: varchar('username', { length: 16 }).notNull().unique(),
});
