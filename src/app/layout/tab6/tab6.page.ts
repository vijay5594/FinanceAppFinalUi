import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { ApiService } from 'src/app/services/api.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-tab6',
    templateUrl: './tab6.page.html',
    styleUrls: ['./tab6.page.scss'],
})
export class Tab6Page implements OnInit {

    customerId: any = localStorage.getItem('customerId');
    _data: any;
    paymentForm: FormGroup;
    PaymentId: any = localStorage.getItem('productCustomerId');
    currentUser: string = localStorage.getItem('userName');
    productCustomerList: any;

    constructor(
        private apiService: ApiService,
        private router: Router,
        private modal: ModalController,
        private toast: NotificationService,
        private fb: FormBuilder,
        public alertController: AlertController,
        private userService: UserService,
        public notificationService: NotificationService,
    ) {
        this.getProductDetails();
        this.generatePaymentForm();
        this.customerList();
    }
    ngOnInit(): void {
    }
    ionViewWillEnter() {
        this.getProductDetails();
    }
    getProductDetails() {
        let cid = localStorage.getItem('customerId');
        this.apiService.productForCustomerDetails(cid).subscribe(data => {
            this._data = data;
        });
    }
    generatePaymentForm = () => {
        this.paymentForm = this.fb.group({
            productCustomerId: [this.PaymentId],
            paymentType: ['', Validators.required],
            paymentDate: [moment().format()],
            paidAmount: ['', Validators.required],
            collectedBy: [this.currentUser],
        });
    }
    payFormValue() {
        this.apiService.paymentDetails(this.paymentForm.value).subscribe(data => {
            this.notificationService.success('Paid successfully')
            this.router.navigate(['tabs/tab1']);
        });
        this.modal.dismiss();
        this.paymentForm.reset();
    }
    onClose() {
        this.modal.dismiss();
    }
    thisFormValid() {
        if (this.paymentForm.valid) {
            return true
        } else {
            return false
        }
    }
    getHistory(data: any) {
        this.userService.PaymentId = data
        this.router.navigate(['tabs/tab4']);
    }
    customerList() {
        let pId = this.customerId;
        this.apiService.ProductCustomer(pId).subscribe((data: any) => {
            this.productCustomerList = data
        });
    }
}
