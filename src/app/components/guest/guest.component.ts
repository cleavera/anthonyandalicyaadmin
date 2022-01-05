import { Component, Input } from '@angular/core';
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

    private _guestService: GuestService;

    constructor(guestService: GuestService) {
        this._guestService = guestService;
    }
}