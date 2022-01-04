import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './components/app/app.component';
import { InviteComponent } from './components/invite/invite.component';
import { InvitesComponent } from './components/invites/invites.component';
import { LineComponent } from './components/line/line.component';
import { PageComponent } from './components/page/page.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { API_PROVIDER } from './providers/api/api.provider';
import { InviteService } from './services/invite.service';

@NgModule({
    declarations: [
        AppComponent,
        InviteComponent,
        InvitesComponent,
        LineComponent,
        PageComponent,
        TopBarComponent
    ],
    imports: [
        BrowserModule
    ],
    providers: [
        API_PROVIDER,
        InviteService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
