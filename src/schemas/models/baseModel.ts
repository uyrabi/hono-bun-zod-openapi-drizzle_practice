import { mysqlTable } from 'drizzle-orm/mysql-core';

import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

class BaseModel<T> {

    static commonValidation = {};
    static insertValidation = {};
    static selectValidation = {};
    static selectSchema = createSelectSchema(mysqlTable('dummy', {}), { ...this.commonValidation, ...this.selectValidation });
    static insertSchema = createInsertSchema(mysqlTable('dummy', {}), { ...this.commonValidation, ...this.insertValidation })

    static async create(props: {}, c: any) {
        const newData = await db.insert(this.targetTable).values(props).returning().get();
        return newData;
    }

}

export { BaseModel };