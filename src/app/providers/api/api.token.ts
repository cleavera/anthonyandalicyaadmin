import { InjectionToken } from '@angular/core';
import { Api } from '@skimp/client';

export const API_TOKEN: InjectionToken<Api> = new InjectionToken<Api>('API');