import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Desserts, GuestSchema, InviteSchema, Mains, Starters } from 'anthony-and-alicya-domain';

import { GuestService } from '../../services/guest.service';

@Component({
    selector: 'aa-manage-guest',
    styleUrls: ['./manage-guest.component.scss'],
    templateUrl: './manage-guest.component.html'
})
export class ManageGuestComponent {
    public STARTERS: Array<string> = [
        Starters.PORK,
        Starters.TERRINE,
        Starters.GOATS_CHEESE
    ];

    public MAINS: Array<string> = [
        Mains.PORK,
        Mains.CHICKEN,
        Mains.TAGINE
    ];

    public DESSERTS: Array<string> = [
        Desserts.FONDANT,
        Desserts.CREME_BRULE,
        Desserts.STICKY_TOFFEE
    ];

    @Input()
    public invite!: InviteSchema;

    @Input()
    public guest!: GuestSchema;

    @Output()
    public close: EventEmitter<void> = new EventEmitter<void>();

    private _guestService: GuestService;

    constructor(guestService: GuestService) {
        this._guestService = guestService;
    }

    public async onSubmit(event: Event): Promise<void> {
        event.preventDefault();

        await this._guestService.save(this.guest, this.invite);

        this.close.emit();
    }
}
