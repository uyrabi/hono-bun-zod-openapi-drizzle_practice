import { mysqlTable, MySqlTableWithColumns } from 'drizzle-orm/mysql-core';

import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { eq } from 'drizzle-orm';
import { db } from 'db';

class BaseModel {
    static table: MySqlTableWithColumns<any> = mysqlTable('dummy', {});
    static commonValidation = { deleted_at: z.date().optional() };
    static insertValidation = {};
    static selectValidation = {};
    static selectSchema = createSelectSchema(this.table, { ...this.commonValidation, ...this.selectValidation });
    static insertSchema = createInsertSchema(this.table, { ...this.commonValidation, ...this.insertValidation });

    // static showSelectSchemaDetails(propertyName: string) {
    //     console.log(":", this.insertSchema._def.shape()[propertyName]);
    // }

    static initializeSystemColumns(properties = {}) {
        const now = new Date();
        return {
            ...properties,
            created_at: now,
            updated_at: now
        };
    }

    static initializeSchema(table: MySqlTableWithColumns<any> = this.table) {
        this.selectSchema = createSelectSchema(table, { ...this.commonValidation, ...this.selectValidation });
        this.insertSchema = createInsertSchema(table, { ...this.commonValidation, ...this.insertValidation });
    }

    static showValidationErrors(parsedData: { success: boolean, error: any }, properties: {}, timing: string = "insert") {
        console.error("************************************")
        console.error(`${timing} validation error occured!`);
        console.error("parsedData:", parsedData);
        console.error("properties:", properties);
        parsedData.error.errors.forEach((error: { path: string, message: string }) => {
            console.log(error["path"], error["message"])
        });
        console.error("************************************")
        throw new Error("validation errors");
    }

    static checkInsertValidation(properties: {}, validationRules = {}) {
        this.initializeSchema();
        if (Object.keys(validationRules).length === 0) validationRules = this.selectSchema;
        const parsedData = validationRules.omit({ id: true }).safeParse(properties);
        if (!parsedData.success) {
            this.showValidationErrors(parsedData, properties, "insert");
        }
        return parsedData;
    }

    static checkSelectValidation(properties: {}, validationRules = {}) {
        this.initializeSchema();
        if (Object.keys(validationRules).length === 0) validationRules = this.selectSchema;
        const parsedData = validationRules.safeParse(properties);
        if (!parsedData.success) {
            this.showValidationErrors(parsedData, properties, "select");
        }
        return parsedData;
    }

    static async find(id: number): Promise<any> {
        const result = await db.select().from(this.table).where(eq(this.table.id, id));
        console.log("result:", result[0]);
        const checkValidationResult = this.checkSelectValidation(result[0]);
        if (!checkValidationResult.success) {
            throw new Error("select validation errors");
        }
        return result;
    }

    static async create(properties: {}): Promise<any> {
        properties = this.initializeSystemColumns(properties);
        const checkValidationResult: { success: boolean, error: Function } = this.checkInsertValidation(properties);
        console.log("check insert validation result:", checkValidationResult);
        if (!checkValidationResult.success) {
            this.showValidationErrors(checkValidationResult, properties, "insert");
        }
        const result = await db.insert(this.table).values(properties);
        return result;
    }

}

export { BaseModel };