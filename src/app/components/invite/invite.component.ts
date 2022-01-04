import { Component, Input } from '@angular/core';
import { InviteSchema } from 'anthony-and-alicya-domain';

@Component({
    selector: 'aa-invite',
    styleUrls: ['./invite.component.scss'],
    templateUrl: './invite.component.html'
})
export class InviteComponent {
    @Input()
    public invite!: InviteSchema;
}