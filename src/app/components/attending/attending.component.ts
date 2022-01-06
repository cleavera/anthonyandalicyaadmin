import { Component, Input } from '@angular/core';

@Component({
    selector: 'aa-attending',
    styleUrls: ['./attending.component.scss'],
    templateUrl: './attending.component.html'
})
export class AttendingComponent {
    @Input()
    public attending!: boolean | null;
}