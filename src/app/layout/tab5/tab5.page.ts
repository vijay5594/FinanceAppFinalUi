import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
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
    currentUser: string = localStorage.getItem('userName');
    UserId: string = localStorage.getItem('userId');
    constructor(
        private apiService: ApiService,
        private modal: ModalController,
        private userService: UserService,
        private toast: NotificationService,
        public notificationService: NotificationService,
        private fb: FormBuilder,
        private router: Router,
        private alertController: AlertController
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
    updateLoginForm = () => {
        this.updateUserForm = this.fb.group({
            userId: [''],
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
    GetAllUsers() {

        this.apiService.GetUser(this.UserId).subscribe(data => {
            this.userDetails = data;
            if (this.userDetails.role == 'operator') {
                this.userDetails = Array.of(this.userDetails);
            }
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
        if (((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) && e.keyCode != 8 && e.keyCode != 9) {
            e.preventDefault();
        }
    }
    updateUser(update: any) {
        this.apiService.updateUser(this.updateUserForm.value).subscribe(data => {
            console.log(data, "ahuahahg")
            this.toast.success('Updated Successfully');
            this.modal.dismiss();
            this.GetAllUsers();
        }, (error: Response) => {
            if (error.status === 400) {
                this.notificationService.error("UserName Already Exists")
            }
        });
    }

    async deleteUser(data: any, uname: any) {

        const alert = await this.alertController.create({
            cssClass: "my-custom-class",
            message: "Are you sure want to Delete " + uname + " ?",
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
                        this.apiService.deleteUser(data).subscribe(() => {

                            this.toast.success('Deleted Successfully');
                            this.GetAllUsers();
                            this.router.navigate(['/tabs/tab1']);
                        });

                    }

                }
            ]
        });
        await alert.present();
    }
}
