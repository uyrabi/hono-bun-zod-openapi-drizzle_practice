import { mysqlTable, varchar } from 'drizzle-orm/mysql-core';
import { commonSchemas } from '../commonSchemas';

export const tableSchema = mysqlTable('user', {
    ...commonSchemas,
    email: varchar('email', { length: 64 }).notNull().unique(),
    password: varchar('password', { length: 16 }).notNull(),
    username: varchar('username', { length: 16 }).notNull().unique(),
});

export class Table {
    static schema = tableSchema;
}
