import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { BaseModel } from '@/schemas/models/baseModel';
import { userTable } from '@/schemas/db/tables/user';

class User extends BaseModel {
    // モデル名に合わせる
    static table = userTable;

    // 必要であれば追加のバリデーションを記述
    static commonValidation = Object.assign({ email: z.string().email() }, BaseModel.commonValidation);
    // static insertValidation = Object.assign({ }, this.commonValidation);
    // static selectValidation = Object.assign({ }, this.commonValidation);
    // static selectSchema = createSelectSchema(this.table, { ...this.commonValidation, ...this.selectValidation });
    // static insertSchema = createInsertSchema(this.table, { ...this.commonValidation, ...this.insertValidation });

}

export { User };