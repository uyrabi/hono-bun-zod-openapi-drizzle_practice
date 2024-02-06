import { RepositoryTypes, SelectType, InsertType, zodInsertSchema } from './schema';
import { tableSchema } from './table';
import { commonSchemas } from '../commonSchemas';
import { db } from 'db';

import { eq } from 'drizzle-orm';

class Repository implements RepositoryTypes {
    private static instance: Repository;

    private constructor() { }

    public static getInstance(): Repository {
        if (!Repository.instance) {
            Repository.instance = new Repository();
        }
        return Repository.instance;
    }

    async newValues(): Promise<Omit<typeof tableSchema, 'id'>> {
        // 新しいレコードのデフォルト値を返す
        const defaults = Object.keys(tableSchema).reduce((acc, key) => {
            // 文字列や数値以外はnullにする
            acc[key] = typeof tableSchema[key].default === 'object' ? null : tableSchema[key].default;
            return acc;
        }, {});
        console.log("defaults:", defaults);
        return defaults as Omit<InsertType, 'id'>;
    }

    async isPersisted(record: SelectType): Promise<boolean> {
        // DBに保存されているかどうかを判定するためのメソッド
        const dbRecord = await db.select().from(tableSchema).where(eq(tableSchema.id, record.id));
        return dbRecord.length > 0;
    }

    async findById(id: number): Promise<SelectType | null> {
        // findByIdの実装
        const record = await db.select().from(tableSchema).where(eq(tableSchema.id, id));
        return record[0];
    }

    async all(): Promise<SelectType[]> {
        // 全てのレコードを取得する
        const records = await db.select().from(tableSchema);
        return records;
    }

    async pluck(columns: string[]): Promise<any[]> {
        // 指定したカラムの値を全て取得する
        const records = await db.select(...columns).from(tableSchema);
        return records.map(record => columns.map(column => record[column]));
    }

    async create(params: Omit<InsertType, 'id'>): Promise<InsertType | null> {
        const existingRecord = await this.findById(params.id);
        if (existingRecord) {
            await db.update(tableSchema).set(params).where(eq(tableSchema.id, params.id));
            return this.findById(params.id);
        } else {
            const newRecordResult = await db.insert(tableSchema).values(params);
            const newRecordId = newRecordResult[0].insertId;
            return this.findById(newRecordId);
        }
    }
}

export const UserRepository = Repository.getInstance();