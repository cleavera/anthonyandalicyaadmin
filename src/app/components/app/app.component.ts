import { Component, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadingService } from '../../services/loading.service';

@Component({
    selector: 'aa-app',
    templateUrl: './app.component.html',
    styleUrls: ['app.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
    public isLoading: Observable<boolean>;

    constructor(loadingService: LoadingService) {
        this.isLoading = loadingService.isLoading;
    }
}
