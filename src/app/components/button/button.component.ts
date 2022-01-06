import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'aa-button',
    styleUrls: ['./button.component.scss'],
    templateUrl: './button.component.html'
})
export class ButtonComponent {
    @Input()
    public label!: string;

    @Input()
    public type: string | null = null;

    @Input()
    public disabled: boolean | null = null;

    @Output()
    public activate: EventEmitter<void> = new EventEmitter<void>();

    public onActivate(): void {
        this.activate.emit();
    }
}