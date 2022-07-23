import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { LoadingService } from '../../services/loading.service';
import { UserService } from 'src/app/services/user.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    loginForm: FormGroup;

    constructor(private router: Router,
        private fb: FormBuilder,
        private loadingService: LoadingService,
        private userService: UserService,
        private toast: NotificationService,
        private apiService: ApiService) {
        this.generateLoginForm();
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }

    ngOnInit() {
    }

    generateLoginForm = () => {
        this.loginForm = this.fb.group({
            userName: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    doLogin(loginForm: any) {
        this.apiService.doLogin(this.loginForm.value).subscribe((data) => {
            if (data) {
                this.userService.User = data.userName;
                this.userService.Role = data.role;
                this.userService.Users = data.userId;
                if (data.role == "Admin") {
                    this.userService.IsSuperUser = false;
                    this.loadingService.hide();
                    this.router.navigate(['/tabs/tab1'], { replaceUrl: true });
                }
                else {
                    this.userService.IsSuperUser = true;
                    this.loadingService.hide();
                    this.router.navigate(['/tabs/tab1'], { replaceUrl: true });
                }
            } else {
                this.toast.error('Please enter valid username');
            }
        },
            (error: any) => {
                this.loadingService.hide();
                this.toast.error('Unable to validate user. Please try agian after sometime.');
            });
    }
    
    thisFormValid() {
        if (this.loginForm.valid) {
            return true
        } else {
            return false
        }
    }
}