import { Inject, Injectable } from '@angular/core';
import { Api } from '@skimp/client';
import { ResourceLocation } from '@skimp/core';
import { GuestSchema } from 'anthony-and-alicya-domain';
import { Observable, Subject } from 'rxjs';

import { RepositoryInterface } from '../interfaces/repository.interface';
import { API_TOKEN } from '../providers/api/api.token';

@Injectable()
export class GuestService implements RepositoryInterface<GuestSchema> {
    private _guestSubjects: Record<string, Subject<GuestSchema | null>>;
    private _listSubject: Subject<Array<GuestSchema>>;
    private _api: Api;

    constructor(@Inject(API_TOKEN) api: Api) {
        this._api = api;
        this._guestSubjects = {};
        this._listSubject = new Subject<Array<GuestSchema>>();
    }

    public getAll(): Observable<Array<GuestSchema>> {
        return this._listSubject.asObservable();
    }

    public get(location: ResourceLocation): Observable<GuestSchema | null> {
        return this._get(location).asObservable();
    }

    public async loadAll(): Promise<void> {
        this._listSubject.next(await this._api.list(GuestSchema));
    }

    public async load(location: ResourceLocation): Promise<void> {
        this._get(location).next(await this._api.get(GuestSchema, location));
    }

    private _get(location: ResourceLocation): Subject<GuestSchema | null> {
        if (this._guestSubjects[location.toString()]) {
            this._guestSubjects[location.toString()] = new Subject<GuestSchema | null>();
        }

        return this._guestSubjects[location.toString()];
    }
}
