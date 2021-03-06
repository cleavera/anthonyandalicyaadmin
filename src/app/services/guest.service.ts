import { Inject, Injectable } from '@angular/core';
import { Api, Model } from '@skimp/client';
import { ResourceLocation } from '@skimp/core';
import { GuestSchema, InviteSchema } from 'anthony-and-alicya-domain';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Loading } from '../decorators/loading.decorator';

import { RepositoryInterface } from '../interfaces/repository.interface';
import { API_TOKEN } from '../providers/api/api.token';
import { InviteService } from './invite.service';

@Injectable()
export class GuestService implements RepositoryInterface<GuestSchema> {
    private _guestSubjects: Record<string, Subject<GuestSchema | null>>;
    private _guestInviteSubjects: Record<string, Subject<Array<Observable<GuestSchema | null>>>>;
    private _listSubject: Subject<Array<GuestSchema>>;
    private _api: Api;
    private _inviteService: InviteService;

    constructor(@Inject(API_TOKEN) api: Api, inviteService: InviteService) {
        this._api = api;
        this._inviteService = inviteService;
        this._guestSubjects = {};
        this._listSubject = new BehaviorSubject<Array<GuestSchema>>([]);
        this._guestInviteSubjects = {};
    }

    public getForInvite(invite: InviteSchema): Observable<Array<Observable<GuestSchema | null>>> {
        return this._getForInvite(invite).asObservable();
    }

    public getAll(): Observable<Array<GuestSchema>> {
        return this._listSubject.asObservable();
    }

    public get(location: ResourceLocation): Observable<GuestSchema | null> {
        return this._get(location).asObservable();
    }

    @Loading
    public async loadAll(): Promise<void> {
        this._listSubject.next(await this._api.list(GuestSchema));
    }

    @Loading
    public async load(location: ResourceLocation): Promise<void> {
        this._get(location).next(await this._api.get(GuestSchema, location));
    }

    @Loading
    public async loadForInvite(invite: InviteSchema): Promise<void> {
        const subject: Subject<Array<Observable<GuestSchema | null>>> = this._getForInvite(invite);
        const guests: Array<ResourceLocation> | null = Model.getRelationshipOfType(invite, GuestSchema);

        if (!guests) {
            subject.next([]);

            return;
        }

        subject.next(guests.map((guestLocation: ResourceLocation): Observable<GuestSchema | null> => {
            return this.get(guestLocation);
        }));

        await Promise.all(guests.map((guestLocation: ResourceLocation): Promise<void> => {
            return this.load(guestLocation);
        }));
    }

    public blank(): GuestSchema {
        return new GuestSchema();
    }

    @Loading
    public async save(guest: GuestSchema, invite: InviteSchema): Promise<void> {
        Model.addRelationship(guest, invite);

        guest = await this._api.save(guest);

        Model.addRelationship(invite, guest);

        const location: ResourceLocation | null = Model.getLocation(guest);

        if (location === null) {
            throw new Error(`No location for guest ${guest.name}`);
        }

        await this.load(location);
        await this.loadForInvite(invite);
        await this.loadAll();
    }

    @Loading
    public async remove(guest: GuestSchema, invite: InviteSchema): Promise<void> {
        const location: ResourceLocation | null = Model.getLocation(guest);

        if (location === null) {
            throw new Error(`No location for guest ${guest.name}`);
        }

        await this._api.remove(location);
        Model.removeRelationship(invite, location);

        await this._get(location).next(null);
        await this.loadForInvite(invite)
        await this.loadAll();
    }

    private _get(location: ResourceLocation): Subject<GuestSchema | null> {
        if (!this._guestSubjects[location.toString()]) {
            this._guestSubjects[location.toString()] = new BehaviorSubject<GuestSchema | null>(null);
        }

        return this._guestSubjects[location.toString()];
    }

    private _getForInvite(invite: InviteSchema): Subject<Array<Observable<GuestSchema | null>>> {
        const inviteLocation: ResourceLocation | null = Model.getLocation(invite);

        if (inviteLocation === null) {
            throw new Error(`Invite does not exist ${invite.inviteNumber}`);
        }

        if (!this._guestInviteSubjects[inviteLocation.toString()]) {
            this._guestInviteSubjects[inviteLocation.toString()] = new BehaviorSubject<Array<Observable<GuestSchema | null>>>([]);
        }

        return this._guestInviteSubjects[inviteLocation.toString()];
    }
}
