import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { BaseModel } from '@/schemas/models/baseModel';
import { postTable as table } from '@/schemas/db/tables/post';

class Post extends BaseModel {
    static selectSchema = createSelectSchema(table, { ...this.commonValidation, ...this.selectValidation});
    static insertSchema = createInsertSchema(table, { ...this.commonValidation, ...this.insertValidation});
}

export { Post };