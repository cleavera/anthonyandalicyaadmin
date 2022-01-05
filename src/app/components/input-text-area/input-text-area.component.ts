import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'aa-input-text-area',
    styleUrls: ['./input-text-area.component.scss'],
    templateUrl: './input-text-area.component.html'
})
export class InputTextAreaComponent {
    @Input()
    public label!: string;

    @Input()
    public value!: string;

    @Input()
    public required!: boolean;

    @Input()
    public readonly!: boolean;

    @Output()
    public valueChange: EventEmitter<string> = new EventEmitter<string>();

    public id!: string;

    public ngOnInit(): void {
        this.id = `input-${Math.floor(Math.random() * 1000)}`;
    }

    public onInput(event: Event) {
        this.valueChange.emit((event.currentTarget as HTMLTextAreaElement).value);
    }
}