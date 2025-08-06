import fs from 'fs/promises';
import path from 'path';
import { CollectionSchema, DBData } from './types';

export class DB<T extends CollectionSchema> {
    private data: DBData<T> = {} as DBData<T>;
    private dir: string;

    constructor(dir: string) {
        this.dir = dir;
    }

    async load<K extends keyof T>(collection: K): Promise<void> {
        const file = path.join(this.dir, `${String(collection)}.json`);
        try {
            const content = await fs.readFile(file, 'utf-8');
            this.data[collection] = JSON.parse(content);
        } catch (e) {
            this.data[collection] = {} as Record<string, T[K]>;
        }
    }

    async save<K extends keyof T>(collection: K): Promise<void> {
        const file = path.join(this.dir, `${String(collection)}.json`);
        await fs.writeFile(file, JSON.stringify(this.data[collection], null, 2));
    }

    async set<K extends keyof T>(collection: K, key: string, value: T[K]): Promise<void> {
        if (!this.data[collection]) await this.load(collection);
        const col = this.data[collection] as Record<string, T[K]>;
        col[key] = value;
        await this.save(collection);
    }

    async get<K extends keyof T>(collection: K, key: string): Promise<T[K] | undefined> {
        if (!this.data[collection]) await this.load(collection);
        return this.data[collection][key];
    }

    async delete<K extends keyof T>(collection: K, key: string): Promise<void> {
        if (!this.data[collection]) await this.load(collection);
        delete this.data[collection][key];
        await this.save(collection);
    }

    async find<K extends keyof T>(collection: K, fn: (val: T[K]) => boolean): Promise<T[K][]> {
        if (!this.data[collection]) await this.load(collection);
        return Object.values(this.data[collection]).filter(fn);
    }
}