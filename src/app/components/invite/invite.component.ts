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
    private _guestService: GuestService;

    constructor(guestService: GuestService) {
        this._guestService = guestService;
    }

    public ngOnChanges(): void {
        this.guests$ = this._guestService.getForInvite(this.invite);

        this._guestService.loadForInvite(this.invite);
    }

    public onEdit(): void {
        this.edit.emit();
    }

    public onRemove(): void {
        this.remove.emit();
    }
}
