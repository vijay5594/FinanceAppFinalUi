import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class LoadingService {

    loading: HTMLIonLoadingElement | null = null;
    interval: any;

    constructor(public loadingController: LoadingController) { }

    show = async () => {
        if (this.loading) return;

        this.loading = await this.loadingController.create();
        await this.loading.present();
    }

    hide = () => {
        setInterval(() => {
            this.dismiss();
        }, 1000);
    }

    dismiss = () => {
        if (this.loading) {
            this.loading.dismiss();
            this.loading = null;
            this.clear();
        }
    }

    clear = () => {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }
}
