import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
    selector: 'aa-page',
    styleUrls: ['./page.component.scss'],
    templateUrl: './page.component.html'
})
export class PageComponent {
    public authenticationService: AuthenticationService;

    constructor(authenticationService: AuthenticationService) {
        this.authenticationService = authenticationService;
    }
}
