import { Injectable } from '@angular/core';
import { GuestSchema, GuestTypes } from 'anthony-and-alicya-domain';
import { BehaviorSubject, map, merge, Observable } from 'rxjs';

@Injectable()
export class GuestTypeFilterService {
    public dayFilter: BehaviorSubject<boolean>;
    public eveningFilter: BehaviorSubject<boolean>;
    public filterChange: Observable<void>;

    constructor() {
        this.dayFilter = new BehaviorSubject<boolean>(true);
        this.eveningFilter = new BehaviorSubject<boolean>(true);

        this.filterChange = merge(
            this.dayFilter.pipe(map(() => void 0)),
            this.eveningFilter.pipe(map(() => void 0))
        );
    }

    public evaluate(guest: GuestSchema): boolean {
        return (!this.dayFilter.value && !this.eveningFilter.value) ||
            (this.dayFilter.value && (guest.type === GuestTypes.DAY)) ||
            (this.eveningFilter.value && (guest.type === GuestTypes.EVENING));
    }
}
