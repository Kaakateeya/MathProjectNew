import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NewloginPage } from './newlogin.page';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
const routes: Routes = [
  {
    path: '',
    component: NewloginPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    FormsModule , ReactiveFormsModule
  ],
  declarations: [NewloginPage]
})
export class NewloginPageModule {}
