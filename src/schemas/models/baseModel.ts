import { mysqlTable } from 'drizzle-orm/mysql-core';

import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { eq } from 'drizzle-orm';
import { db } from 'db';

import { userTable } from '@/schemas/db/tables/user';

class BaseModel {
    static table = mysqlTable('dummy', {});
    static commonValidation = {};
    static insertValidation = {};
    static selectValidation = {};
    static selectSchema = createSelectSchema(this.table, { ...this.commonValidation, ...this.selectValidation });
    static insertSchema = createInsertSchema(this.table, { ...this.commonValidation, ...this.insertValidation });

    // static showSelectSchemaDetails(propertyName: string) {
    //     console.log(":", this.insertSchema._def.shape()[propertyName]);
    // }

    static initializeSchema(table = this.table) {
        this.selectSchema = createSelectSchema(table, { ...this.commonValidation, ...this.selectValidation });
        this.insertSchema = createInsertSchema(table, { ...this.commonValidation, ...this.insertValidation });
    }

    static showValidationErrors(parsedData, timing: string = "insert") {
        console.error("************************************")
        console.error(`${timing} validation error occured!`);
        parsedData.error.errors.forEach((error) => {
            console.log(error["path"], error["message"])
        });
        console.error("************************************")
        throw new Error("validation errors");
    }

    static checkInsertValidation(values, validationRules = {}) {
        this.initializeSchema();
        if (Object.keys(validationRules).length === 0) validationRules = this.selectSchema;
        const parsedData = validationRules.safeParse(values);
        if (!parsedData.success) {
            this.showValidationErrors(parsedData, "insert");
        }
        return parsedData;
    }

    static checkSelectValidation(values, validationRules = {}) {
        this.initializeSchema();
        if (Object.keys(validationRules).length === 0) validationRules = this.selectSchema;
        const parsedData = validationRules.safeParse(values);
        if (!parsedData.success) {
            this.showValidationErrors(parsedData, "select");
        }
        return parsedData;
    }

    static async find(id): Promise<any> {
        const result = await db.select().from(this.table).where(eq(this.table.id, id));
        console.log("result:", result[0]);
        const checkValidationResult = this.checkSelectValidation(result[0]);
        if (!checkValidationResult.success) {
            throw new Error("select validation errors");
        }
        return result;
    }

    static async create(values): Promise<any> {
        const checkValidationResult = this.checkInsertValidation(values);
        console.log("check insert validation result:", checkValidationResult);
        if (!checkValidationResult.success) {
            this.showValidationErrors(checkValidationResult);
        }
        const result = await db.insert(this.table).values(values);
        return result;
    }

}

export { BaseModel };