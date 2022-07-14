import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { NotificationService } from '../../services/notification.service';
import { ApiService } from '../../services/api.service';

@Component({
    selector: 'app-tab7',
    templateUrl: './tab7.page.html',
    styleUrls: ['./tab7.page.scss'],
})
export class Tab7Page implements OnInit {

    constructor(public notificationService: NotificationService,
        private router: Router,
        private apiService: ApiService) {
        this.paymentDetails();
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }

    ngOnInit() {
    }
    _payload: any
    from: string = moment().format();
    to: string = moment().format();
    convertedFrom: any
    convertedTo: any
    currentdateFrom = moment().format('MMMM Do YYYY');
    currentdateTo = moment().format('MMMM Do YYYY');
    customerDetailsList: any;
    productDetails: any;
    customerData: any;
    allPaymentDetails: any;
    totalAmount: any;
    currentDate: any;
    payDetails: any;
    convert(data: any) {
        return moment(data).format('MMMM Do YYYY');
    }

    paymentDetails() {
        let payload = {
            'fromDate': new Date(this.from),
            'toDate': new Date(this.to),
        }
        this.apiService.filterItem(payload).subscribe(data => {
            this.allPaymentDetails = data;
        });
        this.apiService.paymenthistory(payload).subscribe((amount: any) => {
            this.totalAmount = amount;
        });
    }
}
