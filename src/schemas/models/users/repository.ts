import { RepositoryTypes, SelectType, InsertType } from './schema';
import { tableSchema } from './table';
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

    async newInstance(): Promise<Omit<InsertType, 'id'>> {
        const properties = {
            email: '',
            password: '',
            username: '',
        }
        return properties;
    }

    async findById(id: number): Promise<SelectType | null> {
        // findByIdの実装
        const record = await db.select().from(tableSchema).where(eq(tableSchema.id, id));
        return record[0];
    }

    async create(params: Omit<InsertType, 'id'>): Promise<InsertType | null> {
        // findByIdの実装
        const newRecordResult = await db.insert(tableSchema).values(params);
        const newRecordId = newRecordResult[0].insertId;
        const newRecord = this.findById(newRecordId);

        return newRecord;
    }
}

export const UserRepository = Repository.getInstance();