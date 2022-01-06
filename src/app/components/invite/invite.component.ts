import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GuestSchema, InviteSchema } from 'anthony-and-alicya-domain';
import { Observable } from 'rxjs';

import { GuestService } from '../../services/guest.service';

@Component({
    selector: 'aa-invite',
    styleUrls: ['./invite.component.scss'],
    templateUrl: './invite.component.html'
})
export class InviteComponent {
    @Input()
    public invite!: InviteSchema;

    @Output()
    public edit: EventEmitter<void> = new EventEmitter<void>();

    @Output()
    public remove: EventEmitter<void> = new EventEmitter<void>();

    public guests$!: Observable<Array<Observable<GuestSchema | null>>>;
    public managingModel: GuestSchema | null = null;
    public openActions: boolean = false;
    private _guestService: GuestService;

    constructor(guestService: GuestService) {
        this._guestService = guestService;
    }

    public ngOnChanges(): void {
        this.guests$ = this._guestService.getForInvite(this.invite);

        this._guestService.loadForInvite(this.invite);
    }

    public onEdit(): void {
        this.closeActionsMenu();
        this.edit.emit();
    }

    public onRemove(): void {
        this.closeActionsMenu();
        this.remove.emit();
    }

    public onAddGuest(): void {
        this.closeActionsMenu();

        this.managingModel = this._guestService.blank();
    }

    public onEditGuest(guest: GuestSchema): void {
        this.managingModel = guest;
    }

    public onRemoveGuest(guest: GuestSchema): void {
        this.closeActionsMenu();

        if (!confirm('Are you sure you want to remove this, it cannot be undone?')) {
            return;
        }

        this._guestService.remove(guest, this.invite);
    }

    public onClose(): void {
        this.managingModel = null;
    }

    public openActionsMenu(): void {
        this.openActions = true;
    }

    public closeActionsMenu(): void {
        this.openActions = false;
    }
}
