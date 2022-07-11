import { Component, OnInit } from '@angular/core';
import { Defetcs, Factory, FiringOrRework, Shifts, Size, TypeOfFormers } from 'src/app/entities/topglove.domain.model';
import { TopGlovEntity } from 'src/app/entities/topglove.model';
import { ApiService } from 'src/app/services/api.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-edit-entity',
  templateUrl: './edit-entity.page.html',
  styleUrls: ['./edit-entity.page.scss'],
})
export class EditEntityPage implements OnInit {

  public item: TopGlovEntity = null;

  _typeOfFormers: string[] = TypeOfFormers.data;
  _factory: string[] = Factory.data;
  _firingOrRework: string[] = FiringOrRework.data;
  _Size: string[] = Size.data;
  _defetcs: string[] = Defetcs.data;
  _shitfs: string[] = Shifts.data;

  constructor(private apiService: ApiService,
    private navCtrl: NavController) {
    const { item } = window.history.state;

    this.item = item;
  }

  ngOnInit() {
  }

  reject = (type: string) => {
    this.item['defectDetails'] = type;
    this.item['quality'] = 'reject';
    this.save();
  }

  accept = () => {
    this.item['defectDetails'] = '';
    this.item['quality'] = 'accept';
    this.save();
  }

  save = () => {
    // this.apiService.updateEntity(this.item).subscribe((result: any) => {
    //   this.navCtrl.navigateBack('/tabs/tab2');
    // }, (error: any) => {

    // });
  }

}
