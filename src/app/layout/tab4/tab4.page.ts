import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import * as moment from 'moment';
import { ApiService } from 'src/app/services/api.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-tab4',
    templateUrl: 'tab4.page.html',
    styleUrls: ['tab4.page.scss']
})

export class Tab4Page {
    _data: any;
    data: any;
    ProductCustomerId: any = localStorage.getItem('productCustomerId');
    constructor(
        private apiService: ApiService,
        private toast: NotificationService,
        public alertController: AlertController,
        private userService: UserService,
    ) {
        this.getPaymentHistory();
    }
    ionViewWillEnter() {
        this.getPaymentHistory();
    }
    ionViewWillLeave() {
        delete this._data
    }
    getPaymentHistory() {
        let pid = localStorage.getItem('productCustomerId');
        this.apiService.CustomerPayHistory(pid).subscribe(data => {
            this._data = data;
        });
    }
    convert(data: any): string {
        return moment(data).format('D-MMM-YYYY');
    }
}
