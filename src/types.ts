export type CollectionSchema = Record<string, any>;
export type DBData<T extends CollectionSchema> = {
    [K in keyof T]: { [key: string]: T[K] };
};