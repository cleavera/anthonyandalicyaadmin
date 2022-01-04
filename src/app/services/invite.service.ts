import { Inject, Injectable } from '@angular/core';
import { Api } from '@skimp/client';
import { InviteSchema } from 'anthony-and-alicya-domain';
import { Observable, Subject } from 'rxjs';

import { API_TOKEN } from '../providers/api/api.token';

@Injectable()
export class InviteService {
    private _listObservable: Subject<Array<InviteSchema>> = new Subject<Array<InviteSchema>>();
    private _api: Api;

    constructor(@Inject(API_TOKEN) api: Api) {
        this._api = api;
    }

    public getAll(): Observable<Array<InviteSchema>> {
        return this._listObservable.asObservable();
    }

    public async loadAll(): Promise<void> {
        this._listObservable.next(await this._api.list(InviteSchema));
    }
}
