import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'aa-input-text',
    styleUrls: ['./input-text.component.scss'],
    templateUrl: './input-text.component.html'
})
export class InputTextComponent {
    @Input()
    public label!: string;

    @Input()
    public value!: string | null;

    @Input()
    public required!: boolean;

    @Input()
    public readonly!: boolean;

    @Output()
    public valueChange: EventEmitter<string | null> = new EventEmitter<string | null>();

    public id!: string;

    public ngOnInit(): void {
        this.id = `input-${Math.floor(Math.random() * 1000)}`;
    }

    public onInput(event: Event) {
        this.valueChange.emit((event.currentTarget as HTMLInputElement).value);
    }
}