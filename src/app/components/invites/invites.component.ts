import { Component } from '@angular/core';

@Component({
    selector: 'aa-invites',
    styleUrls: ['./invites.component.scss'],
    templateUrl: './invites.component.html'
})
export class InvitesComponent {
    constructor() {
        this.test();
    }

    public async test(): Promise<void> {
        const response: Response = await fetch('https://anthonyandalicyadomain.azurewebsites.net/invite', {
            headers: {
                'Accept': 'application/json'
            }
        });

        console.log(await response.json());
    }
}