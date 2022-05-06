import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { GuestSchema } from 'anthony-and-alicya-domain';

import { AttendanceFilterService } from '../../services/attendance-filter.service';
import { GuestService } from '../../services/guest.service';

@Component({
    selector: 'aa-guest',
    styleUrls: ['./guest.component.scss'],
    templateUrl: './guest.component.html'
})
export class GuestComponent implements OnInit {
    @Input()
    public guest!: GuestSchema;

    @Output()
    public edit: EventEmitter<void> = new EventEmitter<void>();

    @Output()
    public remove: EventEmitter<void> = new EventEmitter<void>();

    @Output()
    public hide: EventEmitter<boolean> = new EventEmitter<boolean>();

    @HostBinding('hidden')
    public hidden: boolean;

    public openActions: boolean = false;
    private _guestService: GuestService;
    private _attendanceFilterService: AttendanceFilterService;

    constructor(guestService: GuestService, attendanceFilterService: AttendanceFilterService) {
        this._guestService = guestService;
        this._attendanceFilterService = attendanceFilterService;
        this.hidden = false;
    }

    public ngOnInit(): void {
        this._attendanceFilterService.filterChange.subscribe(() => {
            this.hidden = !this._attendanceFilterService.evaluate(this.guest);
            this.hide.emit(this.hidden);
        });
    }

    public onEdit(): void {
        this.closeActionsMenu();
        this.edit.emit();
    }

    public onRemove(): void {
        this.closeActionsMenu();
        this.remove.emit();
    }

    public openActionsMenu(): void {
        this.openActions = true;
    }

    public closeActionsMenu(): void {
        this.openActions = false;
    }
}