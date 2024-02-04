import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { BaseModel } from '@/schemas/models/baseModel';
import { userTable as table } from '@/schemas/db/tables/user';

class User extends BaseModel {
    static targetTable = table;
    static commonValidation = { email: z.string().email() };
    static selectSchema = createSelectSchema(table, { ...this.commonValidation, ...this.selectValidation });
    static insertSchema = createInsertSchema(table, { ...this.commonValidation, ...this.insertValidation });
}

export { User };