import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { GuestSchema } from 'anthony-and-alicya-domain';
import { Observable } from 'rxjs';

@Component({
    selector: 'aa-guests',
    styleUrls: ['./guests.component.scss'],
    templateUrl: './guests.component.html'
})
export class GuestsComponent implements OnChanges {
    @Input()
    public guests!: Array<Observable<GuestSchema | null>>;

    @Output()
    public edit: EventEmitter<GuestSchema> = new EventEmitter<GuestSchema>();

    @Output()
    public remove: EventEmitter<GuestSchema> = new EventEmitter<GuestSchema>();

    @Output()
    public hasGuests: EventEmitter<boolean> = new EventEmitter<boolean>();

    private _showingGuests: Array<boolean> = [];

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes['guests'] && changes['guests'].currentValue) {
            this._showingGuests = changes['guests'].currentValue.map(() => {
                return true;
            });
        }
    }

    public onEdit(guest: GuestSchema): void {
        this.edit.emit(guest);
    }

    public onRemove(guest: GuestSchema): void {
        this.remove.emit(guest);
    }

    public onHide(hidden: boolean, index: number): void {
        this._showingGuests[index] = !hidden;
        this.hasGuests.next(this._showingGuests.length === 0 || this._showingGuests.includes(true));
    }
}