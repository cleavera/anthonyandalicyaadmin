import { Component } from '@angular/core';
import { AttendanceFilterService } from '../../services/attendance-filter.service';

@Component({
    selector: 'aa-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
    public openFilter: boolean = false;
    public attendanceFilterService: AttendanceFilterService;
    public filterApplied: boolean;

    constructor(attendanceFilterService: AttendanceFilterService) {
        this.attendanceFilterService = attendanceFilterService;
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
            && this.attendanceFilterService.notRespondedFilter.value);
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
}
