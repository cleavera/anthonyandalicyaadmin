import { Injectable } from '@angular/core';
import { asyncScheduler, BehaviorSubject, Observable, throttleTime } from 'rxjs';

@Injectable()
export class LoadingService {
    public isLoading: Observable<boolean>;
    private _isLoading: BehaviorSubject<boolean>;
    private _promises: Array<Promise<unknown>>;

    constructor() {
        this._isLoading = new BehaviorSubject<boolean>(false);
        this.isLoading = this._isLoading.pipe(
            throttleTime(200, asyncScheduler, {
                leading: true,
                trailing: true
            })
        );

        this._promises = [];
    }

    public addPromise(promise: Promise<unknown>): void {
        this._isLoading.next(true);
        this._promises.push(promise);

        promise.finally(() => {
            this._promises.splice(this._promises.indexOf(promise), 1);

            if (this._promises.length === 0) {
                this._isLoading.next(false);
            }
        });
    }
}
