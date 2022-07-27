import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './components/app/app.component';
import { AttendingComponent } from './components/attending/attending.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { ButtonComponent } from './components/button/button.component';
import { FilterComponent } from './components/filter/filter.component';
import { GuestTypeComponent } from './components/guest-type/guest-type.component';
import { GuestComponent } from './components/guest/guest.component';
import { GuestsComponent } from './components/guests/guests.component';
import { InputBooleanComponent } from './components/input-boolean/input-boolean.component';
import { InputOptionComponent } from './components/input-option/input-option.component';
import { InputPasswordComponent } from './components/input-password/input-password.component';
import { InputTextAreaComponent } from './components/input-text-area/input-text-area.component';
import { InputTextComponent } from './components/input-text/input-text.component';
import { InviteComponent } from './components/invite/invite.component';
import { InvitesComponent } from './components/invites/invites.component';
import { LineComponent } from './components/line/line.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ManageGuestComponent } from './components/manage-guest/manage-guest.component';
import { ManageInviteComponent } from './components/manage-invite/manage-invite.component';
import { MenuComponent } from './components/menu/menu.component';
import { ModalComponent } from './components/modal/modal.component';
import { PageComponent } from './components/page/page.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { TranslatePipe } from './pipes/translate.pipe';
import { API_PROVIDER } from './providers/api/api.provider';
import { LOADING_SERVICE_PROVIDER } from './providers/loading-service/loading-service.provider';
import { AttendanceFilterService } from './services/attendance-filter.service';
import { AuthenticationService } from './services/authentication.service';
import { DownloadService } from './services/download.service';
import { ExportService } from './services/export.service';
import { GuestFilterService } from './services/guest-filter.service';
import { GuestTypeFilterService } from './services/guest-type-filter.service';
import { GuestService } from './services/guest.service';
import { InviteService } from './services/invite.service';

@NgModule({
    declarations: [
        AppComponent,
        AuthenticationComponent,
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
        InputPasswordComponent,
        InputOptionComponent,
        InputTextAreaComponent,
        GuestTypeComponent,
        TranslatePipe,
        AttendingComponent,
        InputBooleanComponent,
        MenuComponent,
        ModalComponent,
        ButtonComponent,
        LoadingComponent,
        FilterComponent
    ],
    imports: [
        BrowserModule,
        CommonModule
    ],
    providers: [
        API_PROVIDER,
        AttendanceFilterService,
        AuthenticationService,
        DownloadService,
        ExportService,
        GuestFilterService,
        GuestTypeFilterService,
        GuestService,
        LOADING_SERVICE_PROVIDER,
        InviteService,
        TranslatePipe
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
