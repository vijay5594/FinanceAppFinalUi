import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import * as FileSaver from 'file-saver';
import { NotificationService } from 'src/app/services/notification.service';
import { AlertController, IonInfiniteScroll, ModalController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, MaxValidator, Validators } from '@angular/forms';
import * as moment from 'moment';
import { IfStmt } from '@angular/compiler';

@Component({
    selector: 'app-tab3',
    templateUrl: 'tab3.page.html',
    styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

    currentUser: string = localStorage.getItem('userName');
    productId: any = localStorage.getItem('productId');
    filterArray: any;
    _data: any;
    customerForm: FormGroup;
    isShowError: boolean = false;
    ischeckMobileNumber: boolean = true;
    ischeckAdharNumber: boolean = true;
    isShowErrors: any;
    attachmentId: any;
    updateForm: FormGroup;
    pName: any;
    status: any;
    page: number = 1;
    searchevent: Event;
    filterToPush: any;
    arrayData = []
    searchvalue: boolean = false;

    constructor(
        private apiService: ApiService,
        private router: Router,
        public notificationService: NotificationService,
        private modal: ModalController,

        private http: HttpClient,
        private fb: FormBuilder,
        private toast: NotificationService,
        public alertController: AlertController,
        private userService: UserService,
    ) {
        this.getCustomerDetail();
        this.generateCustomerForm();
        this.generateDetails();
        this.loadMorePosts('');
    }
    ngOnInit(): void {
    }
    @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

    ionViewWillEnter() {
        this.generateCustomerForm();
        this.generateDetails();
        this.getCustomerDetail();
        }
    ionViewWillLeave() {
    }
    getCustomerDetail = () => {
        this.apiService.getProductDetailsById(localStorage.getItem('productId')).subscribe(data => {
            this.pName = data[0] ?.productName;
        });
    }
    loadMorePosts(event) {
        this.apiService.CustomerPagination(this.page).subscribe((data: any) => {
            setTimeout(() => {
                for (let i = 0; i < data.length; i++) {
                    this.arrayData.push(data[i]);
                    this.filterToPush = this.arrayData;
                }
                event.target ?.complete();
                this.page++;
            }, 800);
        });
    }
    doInfinite(event) {
        if (event) {
            let value = event.target.value;
            this.apiService.FilterCustomerSearch(value).subscribe((data: any) => {
                this.filterToPush = data;
                this.infiniteScroll.disabled = true;
            });
        }
        if (event.target.value === '' || undefined) {
            window.location.reload();
            this.loadMorePosts(event);
        }
    }
    getFileDownload(id: any) {
        return this.http.get('https://localhost:5001/api/Fileupload/DownloadFile?id=' + id, { responseType: 'blob' }).subscribe((event) => {
            FileSaver.saveAs(event);
        });
    }
    async presentAlertConfirm(data: any, custName: any) {
        let payload = {
            'createdBy': this.currentUser,
            'customerId': data,
            'productId': localStorage.getItem('productId')
        }
        const alert = await this.alertController.create({
            cssClass: "my-custom-class",
            message: "Are you sure want to add " + custName + " to " + this.pName,
            buttons: [
                {
                    text: "Cancel",
                    role: "cancel",
                    cssClass: "secondary",
                    handler: blah => {
                    }
                },
                {
                    text: "Okay",
                    handler: () => {
                        this.apiService.insertProductCustomer(payload).subscribe((data: any) => {
                            this.toast.success('Added Successfully');
                            this.router.navigate(['/tabs/tab1']);
                        },
                            (error: Response) => {
                                if (error.status === 400) {
                                    this.notificationService.error("Slot Maximum Limit Reached ")
                                };
                            });
                    },
                }
            ]
        });
        await alert.present();
    }
    customerHistory(data: any) {
        this.userService.customer = data;
        this.apiService.productForCustomerDetails(data).subscribe(data => {
            this.router.navigate(['/tabs/tab6']);
        });
    }
    generateCustomerForm = () => {
        this.customerForm = this.fb.group({
            customerName: ['', Validators.required],
            guarantorName: ['', Validators.required],
            address: ['', Validators.required],
            mobileNumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
            additionalMobileNumber: [''],
            aadharNumber: ['', Validators.required],
            referredBy: ['', Validators.required],
            fileUpload: ['', Validators.required],
            createdBy: [this.currentUser],
            dateOfCreated: [moment().format()]

        });
    }
    generateDetails = () => {
        this.updateForm = this.fb.group({
            customerId: [''],
            customerName: ['', Validators.required],
            guarantorName: ['', Validators.required],
            address: ['', Validators.required],
            mobileNumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
            additionalMobileNumber: [''],
            aadharNumber: ['', Validators.required],
            referredBy: ['', Validators.required],
            attachmentId: [''],
            attachmentName: [''],
        });
    }
    get f() { return this.customerForm.controls; }
    save(customerForm: any) {
        customerForm.attachmentId = this.attachmentId;
        this.apiService.insertCustomer(this.customerForm.value).subscribe(data => {
            this.customerForm.reset();
            this.notificationService.success('Customer details saved successfully')
            this.modal.dismiss().then(() => {
                window.location.reload();
            });
            this.loadMorePosts('');
        });
    }
    uploadcandidateFile = (fileChangeEvent: any) => {
        const photo = fileChangeEvent.target.files[0];
        const formData = new FormData();
        formData.append('file', photo);
        this.apiService.fileUpload(formData).subscribe((file: any) => {
            this.attachmentId = file.attachmentId;
        });
    }
    CheckMobileNumber() {
        this.isShowError = false
        this.ischeckMobileNumber = true;
        if (this.f.mobileNumber.invalid) {
            return;
        } else {
            this.apiService.existMobileNumber(this.f.mobileNumber.value).subscribe(data => {
                if (data['message'] == 'You Can Enter') {
                    this.ischeckMobileNumber = false
                } else {
                    this.ischeckMobileNumber = true;
                    this.isShowError = true
                }
            });
        }
    }
    CheckAdharNumber() {
        this.isShowErrors = false
        this.ischeckAdharNumber = true;
        if (this.f.aadharNumber.invalid) {
            return;
        } else {
            this.apiService.existAdharNumber(this.f.aadharNumber.value).subscribe(data => {
                if (data['message'] == 'You Can Enter') {
                    this.ischeckAdharNumber = false
                } else {
                    this.ischeckAdharNumber = true;
                    this.isShowErrors = true
                }
            });
        }
    }
    validateNumber(e) {
        const keyCode = e.keyCode;
        if (((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) && e.keyCode != 8) {
            e.preventDefault();
        }
    }
    onClose() {
        this.modal.dismiss();
        this.loadMorePosts('');
    }
    thisFormValid() {
        if (this.customerForm.valid) {
            return true
        } else {
            return false
        }
    }
    updateCustomer(update: any) {
        this.apiService.updateCustomer(this.updateForm.value).subscribe(data => {
            this.toast.success('Added Successfully');
            this.modal.dismiss();
            this.loadMorePosts('');
        }, (error: Response) => {
            if (error.status === 400) {
                this.notificationService.error("Mobile Number Already Exists")
            }
        });
    }
}
