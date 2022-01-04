import { Component, OnInit } from '@angular/core';
import { InviteSchema } from 'anthony-and-alicya-domain';
import { InviteService } from '../../services/invite.service';

@Component({
    selector: 'aa-invites',
    styleUrls: ['./invites.component.scss'],
    templateUrl: './invites.component.html'
})
export class InvitesComponent implements OnInit {
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
}