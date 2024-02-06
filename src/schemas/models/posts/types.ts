import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { tableSchema } from './table';

// 型ユーティリティ: Pick, Omit, Partial, Required, Readonly, Record, Exclude, Extract

// *** 型は下部に記述してあるものをベースにしてください

// リポジトリ層（DB操作）で使う型をここに定義
export type RepositoryTypes = {
    newValues: () => Promise<Omit<InsertType, 'id'>>;
    findById: (id: number) => Promise<SelectType | null>;
    create: (params: Omit<InsertType, 'id'>) => Promise<InsertType | null>;
}

// サービス層（DB操作以外）で使う型をここに定義
export type ServiceTypes = {

}

// *** 変更しない ここから
// ---------- テーブルのカラム情報　→　Zodスキーマ → 型定義を生成する ----------

// テーブルのカラム情報からZod（バリデータ）スキーマを生成
const zodSelectSchema = createSelectSchema(tableSchema);
export const zodInsertSchema = createInsertSchema(tableSchema);

// z.infer<typeof Hoge> でZodのスキーマからtypeを取得できる
export type SelectType = z.infer<typeof zodSelectSchema>;
export type InsertType = z.infer<typeof zodInsertSchema>;

// *** 変更しない ここまで-