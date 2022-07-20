import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { UserService } from 'src/app/services/user.service';
import { PopoverController } from '@ionic/angular';

@Component({
    selector: 'app-tabs',
    templateUrl: 'tabs.page.html',
    styleUrls: ['tabs.page.scss']
})
export class TabsPage {

    currentUser: string = localStorage.getItem('userName');
    role: string = localStorage.getItem('Role')

    constructor(public userService: UserService,
        private apiService: ApiService,
        private router: Router,
        private popOver: PopoverController) { }

    logout = () => {
        this.apiService.logout();
        this.router.navigate(['./login']);
        this.popOver.dismiss();
        window.location.reload();
    }
}
