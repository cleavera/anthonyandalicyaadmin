import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'aa-input-boolean',
    styleUrls: ['./input-boolean.component.scss'],
    templateUrl: './input-boolean.component.html'
})
export class InputBooleanComponent {
    @Input()
    public label!: string;

    @Input()
    public value!: boolean | null;

    @Output()
    public valueChange: EventEmitter<boolean | null> = new EventEmitter<boolean | null>();

    public id!: string;

    public ngOnInit(): void {
        this.id = `input-${Math.floor(Math.random() * 1000)}`;
    }

    public onInput(value: boolean | null) {
        this.valueChange.emit(value);
    }
}