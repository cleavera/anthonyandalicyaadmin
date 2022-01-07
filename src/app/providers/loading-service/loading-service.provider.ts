import { Provider } from '@angular/core';
import { LoadingService } from '../../services/loading.service';
import { LOADING_SERVICE } from './loading-service.constant';

export const LOADING_SERVICE_PROVIDER: Provider = {
    provide: LoadingService,
    useValue: LOADING_SERVICE
};
