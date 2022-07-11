import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AppUpdatorService {

  constructor(private swUpdate: SwUpdate,
    public toastController: ToastController) { }

  checkPWAUpdate = () => {
    this.swUpdate.available.subscribe(async res => {
      this.showUpdateToast();
    });

    this.swUpdate.checkForUpdate();

    setInterval(() => {
      this.swUpdate.checkForUpdate();
    }, 15 * 60 * 1000);

  }

  showUpdateToast = async () => {
    const toast = await this.toastController.create({
      message: 'App update is available!',
      position: 'bottom',
      animated: true,
      color: 'primary',
      cssClass: 'app-update-toast',
      buttons: [{ role: 'cancel', text: 'Reload' }]
    });
    await toast.present();
    toast
      .onDidDismiss()
      .then(() => this.swUpdate.activateUpdate())
      .then(() => window.location.reload());
  }

  checkIfUpdateExist = () => {
    this.swUpdate.available.subscribe(async res => {
      this.showUpdateToast();
    });

    this.swUpdate.checkForUpdate();
  }

}
