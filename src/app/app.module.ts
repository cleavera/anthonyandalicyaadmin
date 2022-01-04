import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './components/app/app.component';
import { ManageInviteComponent } from './components/manage-invite/manage-invite.component';
import { InviteComponent } from './components/invite/invite.component';
import { InvitesComponent } from './components/invites/invites.component';
import { LineComponent } from './components/line/line.component';
import { PageComponent } from './components/page/page.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { API_PROVIDER } from './providers/api/api.provider';
import { GuestService } from './services/guest.service';
import { InviteService } from './services/invite.service';

@NgModule({
    declarations: [
        AppComponent,
        InviteComponent,
        InvitesComponent,
        LineComponent,
        PageComponent,
        TopBarComponent,
        ManageInviteComponent
    ],
    imports: [
        BrowserModule
    ],
    providers: [
        API_PROVIDER,
        GuestService,
        InviteService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
