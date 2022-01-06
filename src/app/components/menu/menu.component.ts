import { Component, Input } from '@angular/core';

@Component({
    selector: 'aa-menu',
    styleUrls: ['./menu.component.scss'],
    templateUrl: './menu.component.html'
})
export class MenuComponent {
    @Input()
    public starter!: string | null;

    @Input()
    public main!: string | null;

    @Input()
    public dessert!: string | null;
}
