import { Component, Input } from '@angular/core';
import { GuestTypes } from 'anthony-and-alicya-domain';

@Component({
    selector: 'aa-guest-type',
    styleUrls: ['./guest-type.component.scss'],
    templateUrl: './guest-type.component.html'
})
export class GuestTypeComponent {
    public className: Record<string, string> = {
        [GuestTypes.DAY]: 'day',
        [GuestTypes.EVENING]: 'evening'
    };

    @Input()
    public guestType!: string;
}