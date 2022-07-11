import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    constructor(public toastController: ToastController) { }

    error = async (message: string) => {
        const toast = await this.toastController.create({
            message: message,
            duration: 1500,
            position: 'top',
            color: 'danger'
        });

        toast.present();
    }

    success = async (message: string) => {
        const toast = await this.toastController.create({
            message: message,
            duration: 1500,
            position: 'top',
            color: 'success',
            cssClass: 'app-update-toast'
        });

        toast.present();
    }

    info = async (message: string) => {
        const toast = await this.toastController.create({
            message: message,
            duration: 1500,
            position: 'top',
        });

        toast.present();
    }
}
