import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { BaseModel } from '@/schemas/models/baseModel';
import { userTable } from '@/schemas/db/tables/user';

class User extends BaseModel {
    static table = userTable;
    static commonValidation = { ...BaseModel.commonValidation, email: z.string().email() };
}

export { User };