import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
    selector: 'aa-authentication',
    styleUrls: ['./authentication.component.scss'],
    templateUrl: './authentication.component.html'
})
export class AuthenticationComponent {
    public incorrect: boolean;

    private _authenticationService: AuthenticationService;
    private _password: string;

    constructor(authenticationService: AuthenticationService) {
        this._authenticationService = authenticationService;
        this._password = '';
        this.incorrect = false;
    }

    public onPasswordChange(password: string | null): void {
        this._password = password ?? '';
    }

    public async onSubmit(): Promise<void> {
        try {
            await this._authenticationService.set(this._password);
        } catch (e) {
            this.incorrect = true;
        }
    }
}