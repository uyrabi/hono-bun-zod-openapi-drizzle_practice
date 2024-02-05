import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { BaseModel } from '@/schemas/models/baseModel';
import { tableSchema } from './table';

// 型ユーティリティ: Pick, Omit, Partial, Required, Readonly, Record, Exclude, Extract
// z.infer<typeof Hoge> で型を取得できる

const zodSelectSchema = createSelectSchema(tableSchema);
const zodInsertSchema = createInsertSchema(tableSchema);

export type InsertType = z.infer<typeof zodInsertSchema>;
export type SelectType = z.infer<typeof zodSelectSchema>;

export type RepositoryTypes = {
    newInstance: () => Promise<Omit<InsertType, 'id'>>;
    findById: (id: number) => Promise<SelectType | null>;
    create: (params: Omit<InsertType, 'id'>) => Promise<InsertType | null>;
}

export type ServiceTypes = {

}

export class Schema extends BaseModel {
    // モデル名に合わせる
    static table = tableSchema;
    // 必要であれば追加のバリデーションを記述
    static commonValidation = Object.assign({}, BaseModel.commonValidation);
    static insertValidation = Object.assign({}, BaseModel.commonValidation);
    static selectValidation = Object.assign({}, BaseModel.commonValidation);
    // static selectSchema = createSelectSchema(this.table, { ...this.commonValidation, ...this.selectValidation });
    // static insertSchema = createInsertSchema(this.table, { ...this.commonValidation, ...this.insertValidation });

}