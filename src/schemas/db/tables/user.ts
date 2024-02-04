import { mysqlTable, varchar } from 'drizzle-orm/mysql-core';
import { schemaBase } from '../commonColumns';

export const userTable = mysqlTable('user', {
  ...schemaBase,
  email: varchar('email', { length: 256 }).notNull().unique(),
  password: varchar('password', { length: 256 }).notNull(),
  username: varchar('username', { length: 256 }).notNull().unique(),
});
