import { Component, OnInit } from '@angular/core';
import { InviteSchema } from 'anthony-and-alicya-domain';

import { InviteService } from '../../services/invite.service';

@Component({
    selector: 'aa-invites',
    styleUrls: ['./invites.component.scss'],
    templateUrl: './invites.component.html'
})
export class InvitesComponent implements OnInit {
    public managingModel: InviteSchema | null = null;
    public invites: Array<InviteSchema> | null = null;
    private _invitesService: InviteService;

    constructor(invitesService: InviteService) {
        this._invitesService = invitesService;
    }

    public async ngOnInit(): Promise<void> {
        this._invitesService.getAll().subscribe((invites: Array<InviteSchema>) => {
            this.invites = invites;
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
}
