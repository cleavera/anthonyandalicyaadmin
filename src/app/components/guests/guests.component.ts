import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GuestSchema } from 'anthony-and-alicya-domain';
import { Observable } from 'rxjs';

@Component({
    selector: 'aa-guests',
    styleUrls: ['./guests.component.scss'],
    templateUrl: './guests.component.html'
})
export class GuestsComponent {
    @Input()
    public guests!: Array<Observable<GuestSchema | null>>;

    @Output()
    public edit: EventEmitter<GuestSchema> = new EventEmitter<GuestSchema>();

    @Output()
    public remove: EventEmitter<GuestSchema> = new EventEmitter<GuestSchema>();

    public onEdit(guest: GuestSchema): void {
        this.edit.emit(guest);
    }

    public onRemove(guest: GuestSchema): void {
        this.remove.emit(guest);
    }
}