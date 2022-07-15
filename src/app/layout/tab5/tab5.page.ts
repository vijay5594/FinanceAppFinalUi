import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';
@Component({
    selector: 'app-tab5',
    templateUrl: './tab5.page.html',
    styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {
   
    loginForm: FormGroup;
    isShowError: boolean = false;
    isUsername: boolean = true;
    userDetails: any;
    updateUserForm: FormGroup;

    constructor(
        private apiService: ApiService,
        private modal: ModalController,
        private userService: UserService,
        private toast: NotificationService,
        public notificationService: NotificationService,
        private fb: FormBuilder
    ) {
        this.generateLoginForm();
       this.updateLoginForm();
        this.GetAllUsers();
    }

    ngOnInit() {
    }
    generateLoginForm = () => {
        this.loginForm = this.fb.group({
            userName: ['', Validators.required],
            password: ['', Validators.required],
            role: ['', Validators.required],
            mail: ['', Validators.required],
            mobileNumber: ['', Validators.required],
            address: ['', Validators.required]
        });
    }
    updateLoginForm=()=>{
        this.updateUserForm=this.fb.group({
            userId:[''],
            userName: ['', Validators.required],
            password: ['', Validators.required],
            role: [''],
            mail: ['', Validators.required],
            mobileNumber: ['', Validators.required],
            address: ['', Validators.required]
        })
    }
    addNewUser() {
        this.apiService.addUser(this.loginForm.value).subscribe(() => {
            this.loginForm.reset();
            this.modal.dismiss().then(() => {
                window.location.reload();
            });
        });

    }
    GetAllUsers()
    {
       
            this.apiService.getAllUserDetails().subscribe((data: any) => {
                this.userDetails = data;
              
            });
    }
    onClose() {
        this.modal.dismiss();
        this.loginForm.reset();
    }
    thisFormValid() {
        if (this.loginForm.valid) {
            return true
        } else {
            return false
        }
    }
   
    checkUser() {
        this.isShowError = false
        this.isUsername = true;
        if (this.s.userName.invalid) {
            return;
        } else {
            this.apiService.existUserName(this.s.userName.value).subscribe(userData => {
                console.log(userData, "fdfdfdsfg")
                if (userData['message'] == 'You Can Enter') {
                    this.isUsername = false
                } else {
                    this.isUsername = true;
                    this.isShowError = true
                }
            });
        }
    }
    get s() { return this.loginForm.controls; }
    validateNumber(e) {
        const keyCode = e.keyCode;
        if (((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) && e.keyCode != 8 &&e.keyCode!=9) {
            e.preventDefault();
        }
    }
    updateUser(update: any) {
        this.apiService.updateUser(this.updateUserForm.value).subscribe(data => {
            console.log(data,"ahuahahg")
            this.toast.success('Updated Successfully');
            this.modal.dismiss();
            this.GetAllUsers();
        }, (error: Response) => {
            if (error.status === 400) {
                this.notificationService.error("UserName Already Exists")
            }
        });
    }
    deleteUser(_data:any){
        console.log(_data,"ghfsdfdfsdffsdffsdf")
        this.apiService.deleteUser(_data).subscribe(()=>{
            console.log(_data,"gfysdfsdffsgfdfgfdghdghdfhhdghgh")
            this.toast.success('Deleted Successfully');
            this.GetAllUsers();
        });

    }
}
