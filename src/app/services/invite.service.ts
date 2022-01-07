import { Inject, Injectable } from '@angular/core';
import { Api, Model } from '@skimp/client';
import { ResourceLocation } from '@skimp/core';
import { InviteSchema } from 'anthony-and-alicya-domain';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { Loading } from '../decorators/loading.decorator';
import { RepositoryInterface } from '../interfaces/repository.interface';
import { API_TOKEN } from '../providers/api/api.token';

@Injectable()
export class InviteService implements RepositoryInterface<InviteSchema> {
    private _inviteSubjects: Record<string, Subject<InviteSchema | null>>;
    private _listSubject: Subject<Array<InviteSchema>>;
    private _api: Api;

    constructor(@Inject(API_TOKEN) api: Api) {
        this._api = api;
        this._inviteSubjects = {};
        this._listSubject = new BehaviorSubject<Array<InviteSchema>>([]);
    }

    public getAll(): Observable<Array<InviteSchema>> {
        return this._listSubject.asObservable();
    }

    public get(location: ResourceLocation): Observable<InviteSchema | null> {
        return this._get(location).asObservable();
    }

    @Loading
    public async loadAll(): Promise<void> {
        this._listSubject.next(await this._api.list(InviteSchema));
    }

    @Loading
    public async load(location: ResourceLocation): Promise<void> {
        this._get(location).next(await this._api.get(InviteSchema, location));
    }

    @Loading
    public async save(invite: InviteSchema): Promise<void> {
        await this._api.save(invite);
        const location: ResourceLocation | null = Model.getLocation(invite);

        if (location === null) {
            throw new Error(`No location for invite ${invite.inviteNumber}`);
        }

        await this.load(location);
        await this.loadAll();
    }

    @Loading
    public async remove(invite: InviteSchema): Promise<void> {
        const location: ResourceLocation | null = Model.getLocation(invite);

        if (location === null) {
            throw new Error(`No location for invite ${invite.inviteNumber}`);
        }

        await this._api.remove(location);

        await this._get(location).next(null);
        await this.loadAll();
    }

    public blank(): InviteSchema {
        const invite: InviteSchema = new InviteSchema();

        invite.inviteNumber = this._generateInviteNumber();

        Model.setLocation(invite, new ResourceLocation('invite', invite.inviteNumber.toString()));

        return invite;
    }

    private _generateInviteNumber(): number {
        return Math.floor(Math.random() * 900000) + 100000;
    }

    private _get(location: ResourceLocation): Subject<InviteSchema | null> {
        if (!this._inviteSubjects[location.toString()]) {
            this._inviteSubjects[location.toString()] = new BehaviorSubject<InviteSchema | null>(null);
        }

        return this._inviteSubjects[location.toString()];
    }
}
