import { Pipe, PipeTransform } from '@angular/core';
import { InviteTypes } from 'anthony-and-alicya-domain';

@Pipe({
    name: 'translate'
})
export class TranslatePipe implements PipeTransform {
    public map: Record<string, string> = {
        [InviteTypes.DAY]: 'Day',
        [InviteTypes.EVENING]: 'Evening'
    }

    public transform(value: string): string {
        return this.map[value] ?? value;
    }
}