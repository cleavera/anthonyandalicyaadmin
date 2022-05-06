import { Injectable } from '@angular/core';
import { GuestSchema } from 'anthony-and-alicya-domain';
import { BehaviorSubject, map, merge, Observable } from 'rxjs';

@Injectable()
export class AttendanceFilterService {
    public attendingFilter: BehaviorSubject<boolean>;
    public notRespondedFilter: BehaviorSubject<boolean>;
    public notAttendingFilter: BehaviorSubject<boolean>;
    public filterChange: Observable<void>;

    constructor() {
        this.attendingFilter = new BehaviorSubject<boolean>(true);
        this.notRespondedFilter = new BehaviorSubject<boolean>(true);
        this.notAttendingFilter = new BehaviorSubject<boolean>(true);

        this.filterChange = merge(
            this.attendingFilter.pipe(map(() => void 0)),
            this.notRespondedFilter.pipe(map(() => void 0)),
            this.notAttendingFilter.pipe(map(() => void 0))
        );
    }

    public evaluate(guest: GuestSchema): boolean {
        return (!this.attendingFilter.value && !this.notRespondedFilter.value && !this.notAttendingFilter.value) ||
            (this.attendingFilter.value && (guest.attending === true)) ||
            (this.notRespondedFilter.value && (guest.attending === null)) ||
            (this.notAttendingFilter.value && (guest.attending === false));
    }
}
