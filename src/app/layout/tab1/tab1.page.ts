import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
    currentUser: string = localStorage.getItem('userName');
    productId: any = localStorage.getItem('productId');
    productDetailsForm: FormGroup;
    isShowError: boolean = false;
    ischecproductName: boolean = true;
    productDetails: any;
    segment: any;
    updateForm: FormGroup;
    filterArray: any;
    IsStatus: any;
    loginForm: FormGroup;
    isUsername: boolean = true;
    

    constructor(private apiService: ApiService,
        private modal: ModalController,
        private router: Router,
        private userService: UserService,
        private toast: NotificationService,
        public notificationService: NotificationService,
        private fb: FormBuilder) {
        this.generateProductForm();
        this.getDetails();
        this.updateProductForm();
        this.generateLoginForm();
    }
    ngOnInit(): void {
        this.segment = 'Chit';
    }
    ionViewWillEnter() {
        this.generateProductForm();
        this.updateProductForm();
        this.getDetails();
    }
    generateLoginForm = () => {
        this.loginForm = this.fb.group({
            userName: ['', Validators.required],
            password: ['', Validators.required],
            role: ['', Validators.required]
        });
    }
    generateProductForm = () => {
        this.productDetailsForm = this.fb.group({
            productName: ['', Validators.required],
            productType: ['', Validators.required],
            productTenure: ['', Validators.required],
            noOfCustomers: ['', Validators.required],
            productDescription: ['', Validators.required],
            price: ['', Validators.required],
            createdBy: [this.currentUser],
            dateOfCreated: [moment().format()],
            startDate: [moment().format()]
        });
    }
    updateProductForm = () => {
        this.updateForm = this.fb.group({
            productId: [''],
            productName: ['', Validators.required],
            productType: ['', Validators.required],
            productTenure: ['', Validators.required],
            noOfCustomers: ['', Validators.required],
            productDescription: ['', Validators.required],
            price: ['', Validators.required],
            isStatus: ['']

        });
    }
    addNewUser() {
        this.apiService.addUser(this.loginForm.value).subscribe((newData: any) => {
            this.loginForm.reset();
            this.modal.dismiss().then(() => {
                window.location.reload();
            });
        });
        this.notificationService.success('User Created Successfully');

    }
    addProductDetails() {
        this.apiService.insertProduct(this.productDetailsForm.value).subscribe((data: any) => {
            this.productDetailsForm.reset();
            this.modal.dismiss().then(() => {
                window.location.reload();
            });
            this.getDetails();
        });
        this.notificationService.success('Product Details Saved Successfully');
    }
    getDetails() {
        this.apiService.getProductDetails().subscribe((data: any) => {
            this.productDetails = data;
            this.filterArray = data;
        });
    }
    segmentChanged(ev: any) {
        this.segment = ev.detail.value;
    }
    checkProduct() {
        this.isShowError = false
        this.ischecproductName = true;
        if (this.f.productName.invalid) {
            return;
        } else {
            this.apiService.existProductName(this.f.productName.value).subscribe(data => {
                if (data['message'] == 'You Can Enter') {
                    this.ischecproductName = false
                } else {
                    this.ischecproductName = true;
                    this.isShowError = true
                }
            });
        }
    }
    checkUser() {
        this.isShowError = false
        this.isUsername = true;
        if (this.s.userName.invalid) {
            return;
        } else {
            this.apiService.existUserName(this.s.userName.value).subscribe(userData => {
                console.log(userData,"fdfdfdsfg")
                if (userData['message'] == 'You Can Enter') {
                    this.isUsername = false
                } else {
                    this.isUsername = true;
                    this.isShowError = true
                }
            });
        }
    }
    SearchFunction(event) {
        let val = event.target.value;
        this.filterArray = this.productDetails;
        this.filterArray = this.filterArray.filter((item: any) => {
            return (item.productName.toLowerCase().indexOf(val.toLowerCase()) > -1);
        });
    }
    get f() { return this.productDetailsForm.controls; }

    get s() { return this.loginForm.controls; }


    convert(data: any): string {
        return moment(data).format('D-MMM-YYYY');
    }
    onClose() {
        this.modal.dismiss();
        this.loginForm.reset();
        this.productDetailsForm.reset();
        this.getDetails();
        
    }
    thisFormValid() {
        if (this.productDetailsForm.valid) {
            return true
        } else {
            return false
        }
    }
    thisFormValids() {
        if (this.loginForm.valid) {
            return true
        } else {
            return false
        }
    }
    getAllCustomerDetails(data: any) {
        this.userService.Product = data
        this.apiService.CustomerForProductDetails(data).subscribe(data => {
            this.router.navigate(['tabs/tab2'])
        });
    }
    updateProduct(updateProductDetailsForm: any) {
        this.apiService.updateProduct(this.updateForm.value).subscribe(data => {
            this.toast.success('Updated sucessfully');
            this.modal.dismiss();
            this.getDetails();
        },
            (error: Response) => {
                if (error.status === 400) {
                    this.notificationService.error("Product Name Exists Already!")
                }
            });
    }
    statusForm(event) {
        this.IsStatus = event.target.value;
        this.productDetails = {
            ...this.updateForm,
            IsStatus: this.IsStatus
        }
    }
}
