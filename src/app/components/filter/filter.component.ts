import { Component } from '@angular/core';
import { AttendanceFilterService } from '../../services/attendance-filter.service';
import { GuestTypeFilterService } from '../../services/guest-type-filter.service';

@Component({
    selector: 'aa-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
    public openFilter: boolean = false;
    public attendanceFilterService: AttendanceFilterService;
    public guestTypeFilterService: GuestTypeFilterService;
    public filterApplied: boolean;

    constructor(attendanceFilterService: AttendanceFilterService, guestTypeFilterService: GuestTypeFilterService) {
        this.attendanceFilterService = attendanceFilterService;
        this.guestTypeFilterService = guestTypeFilterService;
        this.filterApplied = false;
    }

    public openFilterMenu(): void {
        this.openFilter = true;
    }

    public closeFilterMenu(): void {
        this.openFilter = false;
    }

    public filterChanged(): void {
        this.filterApplied = !(this.attendanceFilterService.attendingFilter.value
            && this.attendanceFilterService.notRespondedFilter.value
            && this.attendanceFilterService.notAttendingFilter.value
            && this.guestTypeFilterService.dayFilter.value
            && this.guestTypeFilterService.eveningFilter.value);
    }

    public attendingFilterChange(value: boolean | null): void {
        if (value === null) {
            return;
        }

        this.attendanceFilterService.attendingFilter.next(value);
        this.filterChanged();
    }

    public notAnsweredFilterChange(value: boolean | null): void {
        if (value === null) {
            return;
        }

        this.attendanceFilterService.notRespondedFilter.next(value);
        this.filterChanged();
    }

    public notAttendingFilterChange(value: boolean | null): void {
        if (value === null) {
            return;
        }

        this.attendanceFilterService.notAttendingFilter.next(value);
        this.filterChanged();
    }

    public dayGuestFilterChange(value: boolean | null): void {
        if (value === null) {
            return;
        }

        this.guestTypeFilterService.dayFilter.next(value);
        this.filterChanged();
    }

    public eveningGuestFilterChange(value: boolean | null): void {
        if (value === null) {
            return;
        }

        this.guestTypeFilterService.eveningFilter.next(value);
        this.filterChanged();
    }
}
