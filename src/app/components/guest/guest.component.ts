import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GuestSchema } from 'anthony-and-alicya-domain';

import { GuestService } from '../../services/guest.service';

@Component({
    selector: 'aa-guest',
    styleUrls: ['./guest.component.scss'],
    templateUrl: './guest.component.html'
})
export class GuestComponent {
    @Input()
    public guest!: GuestSchema;

    @Output()
    public edit: EventEmitter<void> = new EventEmitter<void>();

    @Output()
    public remove: EventEmitter<void> = new EventEmitter<void>();

    public openActions: boolean = false;
    private _guestService: GuestService;

    constructor(guestService: GuestService) {
        this._guestService = guestService;
    }

    public onEdit(): void {
        this.closeActionsMenu()
        this.edit.emit();
    }

    public onRemove(): void {
        this.closeActionsMenu()
        this.remove.emit();
    }

    public openActionsMenu(): void {
        this.openActions = true;
    }

    public closeActionsMenu(): void {
        this.openActions = false;
    }
}