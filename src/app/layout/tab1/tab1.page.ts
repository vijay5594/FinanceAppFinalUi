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
  // updateForm: any;
  // toast: any;
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
  // notEmpty: any;
  // empty$: Observable<boolean>;

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
  }


  ngOnInit(): void {
    this.segment = 'Chit';
  }

  ionViewWillEnter() {
    this.generateProductForm();
    this.updateProductForm();
    this.getDetails();
    console.log('came');
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

  // ionViewWillEnter() {
  //     this.customerHistory();
  //     console.log('came');
  //   }
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
      console.log(data, 'getProductDetails')
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
  SearchFunction(event) {
    let val = event.target.value;
    this.filterArray = this.productDetails;
    this.filterArray = this.filterArray.filter((item: any) => {
      return (item.customerName.toLowerCase().indexOf(val.toLowerCase()) > -1);
    });
  }

  get f() { return this.productDetailsForm.controls; }

  convert(data: any): string {
    return moment(data).format('D-MMM-YYYY');
  }

  onClose() {
    this.modal.dismiss();
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
    // this.userService.setProductId(data);
    console.log(this.userService, ' this.userService')
        this.userService.Product = data
    console.log(this.userService.Product, ' this.userService.Product')
    this.apiService.CustomerForProductDetails(data).subscribe(data => {
      console.log(data, 'hello');
      this.router.navigate(['tabs/tab2'])
      // .then(() => {
      //   window.location.reload()
      // });
    });
  }

  getFliterCustomer(data: any) {
  }

  updateProduct(updateProductDetailsForm: any) {
    this.apiService.updateProduct(this.updateForm.value).subscribe(data => {
      console.log(data, 'updateForm')
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
    console.log(this.productDetails, 'this.productDetails')
    console.log(this.IsStatus, 'update')
    console.log(event, 'update')
  }



}

