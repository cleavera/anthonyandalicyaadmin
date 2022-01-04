import { ResourceLocation } from '@skimp/core';
import { Observable } from 'rxjs';

export interface RepositoryInterface<T> {
    getAll(): Observable<Array<T>>;
    get(location: ResourceLocation): Observable<T | null>;
    loadAll(): Promise<void>;
    load(location: ResourceLocation): Promise<void>;
}