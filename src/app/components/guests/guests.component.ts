import { Component, Input } from '@angular/core';
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
}