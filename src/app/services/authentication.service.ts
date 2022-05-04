import { Inject, Injectable } from '@angular/core';
import { Api } from '@skimp/client';
import { BehaviorSubject, Observable } from 'rxjs';
import { Loading } from '../decorators/loading.decorator';
import { API_TOKEN } from '../providers/api/api.token';

@Injectable()
export class AuthenticationService {
    public has$: Observable<boolean>;

    private _hasSubject: BehaviorSubject<boolean>;
    private _api: Api;

    constructor(@Inject(API_TOKEN) api: Api) {
        this._api = api;
        this._hasSubject = new BehaviorSubject<boolean>(false);
        this.has$ = this._hasSubject.asObservable();
    }

    @Loading
    public async set(value: string): Promise<void> {
        this._api.setAuthorisationHeader(`PAT: ${await this._hash(value)}`);

        try {
            await this._api.root();
        } catch (e) {
            throw new Error('Login failed');
        }

        this._hasSubject.next(true);
    }

    private async _hash(password: string): Promise<string> {
        const hashBuffer: ArrayBuffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(password));

        return Array.from(new Uint8Array(hashBuffer))
            .map((bytes: number): string => {
                return bytes.toString(16).padStart(2, '0')
            })
            .join('');
    }
}
