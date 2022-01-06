import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './components/app/app.component';
import { AttendingComponent } from './components/attending/attending.component';
import { GuestComponent } from './components/guest/guest.component';
import { GuestsComponent } from './components/guests/guests.component';
import { InputBooleanComponent } from './components/input-boolean/input-boolean.component';
import { InputOptionComponent } from './components/input-option/input-option.component';
import { InputTextAreaComponent } from './components/input-text-area/input-text-area.component';
import { InputTextComponent } from './components/input-text/input-text.component';
import { InviteTypeComponent } from './components/invite-type/invite-type.component';
import { InviteComponent } from './components/invite/invite.component';
import { InvitesComponent } from './components/invites/invites.component';
import { LineComponent } from './components/line/line.component';
import { ManageGuestComponent } from './components/manage-guest/manage-guest.component';
import { ManageInviteComponent } from './components/manage-invite/manage-invite.component';
import { PageComponent } from './components/page/page.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { TranslatePipe } from './pipes/translate.pipe';
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
        ManageGuestComponent,
        ManageInviteComponent,
        InputTextComponent,
        InputOptionComponent,
        InputTextAreaComponent,
        InviteTypeComponent,
        TranslatePipe,
        AttendingComponent,
        InputBooleanComponent
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
