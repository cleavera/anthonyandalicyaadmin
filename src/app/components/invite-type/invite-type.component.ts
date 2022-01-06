import { Component, Input } from '@angular/core';
import { InviteTypes } from 'anthony-and-alicya-domain';

@Component({
    selector: 'aa-invite-type',
    styleUrls: ['./invite-type.component.scss'],
    templateUrl: './invite-type.component.html'
})
export class InviteTypeComponent {
    public className: Record<string, string> = {
        [InviteTypes.DAY]: 'day',
        [InviteTypes.EVENING]: 'evening'
    };

    @Input()
    public inviteType!: string;
}