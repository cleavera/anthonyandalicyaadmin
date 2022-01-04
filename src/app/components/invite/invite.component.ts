import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InviteSchema } from 'anthony-and-alicya-domain';

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

    public onEdit(): void {
        this.edit.emit();
    }

    public onRemove(): void {
        this.remove.emit();
    }
}