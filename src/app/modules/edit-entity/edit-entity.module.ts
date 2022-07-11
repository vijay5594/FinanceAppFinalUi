import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditEntityPageRoutingModule } from './edit-entity-routing.module';

import { EditEntityPage } from './edit-entity.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditEntityPageRoutingModule
  ],
  declarations: [EditEntityPage]
})
export class EditEntityPageModule {}
