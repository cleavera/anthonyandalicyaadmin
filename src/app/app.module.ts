import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './components/app/app.component';
import { GuestComponent } from './components/guest/guest.component';
import { GuestsComponent } from './components/guests/guests.component';
import { InviteComponent } from './components/invite/invite.component';
import { InvitesComponent } from './components/invites/invites.component';
import { LineComponent } from './components/line/line.component';
import { ManageInviteComponent } from './components/manage-invite/manage-invite.component';
import { PageComponent } from './components/page/page.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { API_PROVIDER } from './providers/api/api.provider';
import { GuestService } from './services/guest.service';
import { InviteService } from './services/invite.service';

@NgModule({
    declarations: [
        AppComponent,
        GuestComponent,
        GuestsComponent,
        InviteComponent,
        InvitesComponent,
        LineComponent,
        PageComponent,
        TopBarComponent,
        ManageInviteComponent
    ],
    imports: [
        BrowserModule,
        CommonModule
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
