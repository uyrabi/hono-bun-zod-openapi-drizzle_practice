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

    async findById(id: number): Promise<SelectType | null> {
        // findByIdの実装
        const record = await db.select().from(tableSchema).where(eq(tableSchema.id, id));
        return record[0];
    }

    async create(params: Omit<InsertType, 'id'>): Promise<Omit<SelectType, 'name'> | null> {
        // createの実装
        return null;
    }
}

export const UserRepository = Repository.getInstance();