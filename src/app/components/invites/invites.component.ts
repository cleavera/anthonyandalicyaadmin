import { Component, OnInit } from '@angular/core';
import { InviteSchema } from 'anthony-and-alicya-domain';
import { delay, merge } from 'rxjs';

import { AttendanceFilterService } from '../../services/attendance-filter.service';
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
    private _attendanceFilter: AttendanceFilterService;

    constructor(invitesService: InviteService, loadingService: LoadingService, attendanceFilter: AttendanceFilterService) {
        this._invitesService = invitesService;
        this._loadingService = loadingService;
        this._attendanceFilter = attendanceFilter;
    }

    public async ngOnInit(): Promise<void> {
        this._invitesService.getAll().subscribe((invites: Array<InviteSchema>) => {
            this.invites = invites;
        });

        this.guestCount = 0;

        merge(
            this._attendanceFilter.filterChange,
            this._loadingService.isLoading
        ).pipe(delay(1)).subscribe(() => {
            this._updateGuestCount();
        });

        await this._invitesService.loadAll();
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
