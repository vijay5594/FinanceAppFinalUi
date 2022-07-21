import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { environment } from '../environments/environment';
import { AppUpdatorService } from './services/app-updator.service';
import { ApiService } from './services/api.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

    UserId = localStorage.getItem('userId');

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private appUpdatorService: AppUpdatorService,
        private apiService: ApiService
    ) {
        this.initializeApp();
        this.CheckUser();

    }
    ngOnInit() {
        if (environment.production) {
            this.appUpdatorService.checkPWAUpdate();
        }
    }
    initializeApp = () => {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }
    CheckUser() {
        this.apiService.CheckUser(this.UserId).subscribe(data => {

            if (data == false) {
                this.apiService.logout();
            }
        });
    }

}
