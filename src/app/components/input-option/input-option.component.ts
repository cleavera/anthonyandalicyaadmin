import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'aa-input-option',
    styleUrls: ['./input-option.component.scss'],
    templateUrl: './input-option.component.html'
})
export class InputOptionComponent {
    @Input()
    public label!: string;

    @Input()
    public value!: string | null;

    @Input()
    public required!: boolean;

    @Input()
    public options!: Array<string>;

    @Output()
    public valueChange: EventEmitter<string | null> = new EventEmitter<string | null>();

    public id!: string;

    public ngOnInit(): void {
        this.id = `input-${Math.floor(Math.random() * 1000)}`;
    }

    public onInput(event: Event) {
        this.valueChange.emit((event.currentTarget as HTMLSelectElement).value);
    }
}