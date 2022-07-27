import { Injectable } from '@angular/core';
import { GuestSchema } from 'anthony-and-alicya-domain';
import { merge, Observable } from 'rxjs';
import { AttendanceFilterService } from './attendance-filter.service';
import { GuestTypeFilterService } from './guest-type-filter.service';

@Injectable()
export class GuestFilterService {
    private _attendanceFilterService: AttendanceFilterService;
    private _guestTypeFilterService: GuestTypeFilterService;
    public filterChange: Observable<void>;

    constructor(attendanceFilterService: AttendanceFilterService, guestTypeFilterService: GuestTypeFilterService) {
        this._attendanceFilterService = attendanceFilterService;
        this._guestTypeFilterService = guestTypeFilterService;

        this.filterChange = merge(
            this._attendanceFilterService.filterChange,
            this._guestTypeFilterService.filterChange
        );
    }

    public evaluate(guest: GuestSchema): boolean {
        return this._attendanceFilterService.evaluate(guest) && this._guestTypeFilterService.evaluate(guest);
    }
}
