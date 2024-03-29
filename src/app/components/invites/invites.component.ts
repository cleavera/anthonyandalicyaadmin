import { Component, OnInit } from '@angular/core';
import { GuestSchema, InviteSchema } from 'anthony-and-alicya-domain';
import { delay, merge } from 'rxjs';
import { DownloadService } from '../../services/download.service';
import { ExportService } from '../../services/export.service';
import { GuestFilterService } from '../../services/guest-filter.service';
import { GuestService } from '../../services/guest.service';
import { InviteService } from '../../services/invite.service';
import { LoadingService } from '../../services/loading.service';

@Component({
    selector: 'aa-invites',
    styleUrls: ['./invites.component.scss'],
    templateUrl: './invites.component.html'
})
export class InvitesComponent implements OnInit {
    public managingModel: InviteSchema | null = null;
    public invites: Array<InviteSchema> | null = null;
    public guestCount!: number;

    private _invitesService: InviteService;
    private _loadingService: LoadingService;
    private _guestFilterService: GuestFilterService;
    private _exportService: ExportService;
    private _guestService: GuestService;
    private _downloadService: DownloadService;

    constructor(invitesService: InviteService, guestService: GuestService, loadingService: LoadingService, guestFilterService: GuestFilterService, exportService: ExportService, downloadService: DownloadService) {
        this._guestService = guestService;
        this._invitesService = invitesService;
        this._loadingService = loadingService;
        this._guestFilterService = guestFilterService;
        this._exportService = exportService;
        this._downloadService = downloadService;
    }

    public async ngOnInit(): Promise<void> {
        this._invitesService.getAll().subscribe((invites: Array<InviteSchema>) => {
            this.invites = invites;
        });

        this.guestCount = 0;

        merge(
            this._guestFilterService.filterChange,
            this._loadingService.isLoading
        ).pipe(delay(1)).subscribe(() => {
            this._updateGuestCount();
        });

        await this._invitesService.loadAll();
    }

    public async onExport(): Promise<void> {
        let guests: Array<GuestSchema> = [];

        this._guestService.getAll().subscribe((emittedGuests: Array<GuestSchema>) => {
            guests = emittedGuests;
        });

        await this._guestService.loadAll();
        this._downloadService.fromContent(this._exportService.asCSV<GuestSchema>(guests, GuestSchema), 'guest-list.csv');
    }

    public onAdd(): void {
        this.managingModel = this._invitesService.blank();
    }

    public onEdit(invite: InviteSchema): void {
        this.managingModel = invite;
    }

    public onAddGuest(invite: InviteSchema): void {
        this.managingModel = invite;
    }

    public async onRemove(invite: InviteSchema): Promise<void> {
        if (!confirm('Are you sure you want to remove this, it cannot be undone?')) {
            return;
        }

        await this._invitesService.remove(invite);
    }

    public onClose(): void {
        this.managingModel = null;
    }

    private _updateGuestCount(): void {
        this.guestCount = document.querySelectorAll('aa-guest:not([hidden])').length;
    }
}
