import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { InviteSchema } from 'anthony-and-alicya-domain';

import { InviteService } from '../../services/invite.service';

@Component({
    selector: 'aa-manage-invite',
    styleUrls: ['./manage-invite.component.scss'],
    templateUrl: './manage-invite.component.html'
})
export class ManageInviteComponent implements OnChanges {
    @Input()
    public invite!: InviteSchema;

    @Output()
    public close: EventEmitter<void> = new EventEmitter<void>();

    private _inviteService: InviteService;

    constructor(inviteService: InviteService) {
        this._inviteService = inviteService;
    }

    public ngOnChanges(): void {
        if (!this.invite.pin) {
            this.onRegeneratePin();
        }
    }

    public onRegeneratePin(): void {
        const values = new Uint8Array(8);

        crypto.getRandomValues(values);

        this.invite.pin = Array.from(values).reduce((pin, value) => {
            return pin + (value % 36).toString(36);
        }, '');
    }

    public async onSubmit(event: Event): Promise<void> {
        event.preventDefault();

        await this._inviteService.save(this.invite);

        this.close.emit();
    }

    public onCancel(): void {
        this.close.emit();
    }
}
