import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { ApiService } from 'src/app/services/api.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
    filterArray: any;
    IsStatus: any;
    productDetails: any;
    segment: any;
    isShowError: boolean = false;
    ischecproductName: boolean = true;
    isUsername: boolean = true;
    productDetailsForm: FormGroup;
    updateForm: FormGroup;
    currentUser: string = localStorage.getItem('userName');
    productId: any = localStorage.getItem('productId');
    isShown: boolean = true;
   
    role: string = localStorage.getItem('Role');
    constructor(
        private apiService: ApiService,
        private modal: ModalController,
        private router: Router,
        private userService: UserService,
        private toast: NotificationService,
        public notificationService: NotificationService,
        private fb: FormBuilder) {
        this.generateProductForm();
        this.updateProductForm();
        this.getDetails();
    }
    ngOnInit(): void {
        this.segment = 'Chit';

    }
    ionViewWillEnter() {
        this.generateProductForm();
        this.updateProductForm();
        this.getDetails();
        this.show();
       

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
            console.log(data,"dsdgds")
            this.productDetails = data;
            this.filterArray = data;
            
        });
    }
    show(){
        if (this.role == 'operator') {
               
            this.isShown = false;
        }
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
    SearchFunction(event) {
        let val = event.target.value;
        this.filterArray = this.productDetails;
        this.filterArray = this.filterArray.filter((item: any) => {
            return (item.productName.toLowerCase().indexOf(val.toLowerCase()) > -1);
        });
    }
    get f() { return this.productDetailsForm.controls; }

    convert(data: any): string {
        return moment(data).format('D-MMM-YYYY');
    }
    onClose() {
        this.modal.dismiss();
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
