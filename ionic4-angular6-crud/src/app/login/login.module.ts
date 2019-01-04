import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { LoginPage } from './login.page';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { MathJaxDirective} from './../directives/math-jax.directive';
import { KatexModule } from 'ng-katex';
const routes: Routes = [
  {
    path: '',
    component: LoginPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    KatexModule
    
  ],
  
  declarations: [LoginPage,MathJaxDirective]
  
})
export class LoginPageModule {}
