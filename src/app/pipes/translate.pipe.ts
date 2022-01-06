import { Pipe, PipeTransform } from '@angular/core';
import { Desserts, GuestTypes, Mains, Starters } from 'anthony-and-alicya-domain';

@Pipe({
    name: 'translate'
})
export class TranslatePipe implements PipeTransform {
    public map: Record<string, string> = {
        [GuestTypes.DAY]: 'Day',
        [GuestTypes.EVENING]: 'Evening',
        [Starters.PORK]: 'Asian spiced confit belly pork, asian slaw, soy dressing',
        [Starters.TERRINE]: 'Coronation chicken terrine, mango salsa, toast',
        [Starters.GOATS_CHEESE]: 'Walnut crushed goats cheese terrine, rocket and balasmic salad',
        [Mains.PORK]: 'Roast pork loin, fondant potato, wilted baby gem, cripsy bacon, garlic cream peas',
        [Mains.CHICKEN]: 'Roast breast of chicken, dauphinoise potatoes, green beans, mushroom fricassee',
        [Mains.TAGINE]: 'Moroccan vegetable and apricot tagine, pine nut and rasin cous-cous raita and flatbread',
        [Desserts.FONDANT]: 'Warm chocolate fondant, pistachio ice cream',
        [Desserts.STICKY_TOFFEE]: 'Sticky toffee pudding with butterscotch sauce and vanilla ice cream',
        [Desserts.CREME_BRULE]: 'Vanilla cremé brulee, seasonal compote'
    }

    public transform(value: string): string {
        return this.map[value] ?? value;
    }
}