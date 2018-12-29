
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MustMatch } from '../helpval/mismatch';
import { LoginService } from '../login/login.service';
import { LoadingController } from '@ionic/angular';
import { observable} from 'rxjs';
import CryptoJS from 'crypto-js';
import 'rxjs';
@Component({
  selector: 'app-newlogin',
  templateUrl: './newlogin.page.html',
  styleUrls: ['./newlogin.page.scss'],
})



export class NewloginPage implements OnInit {  
  todos = {
  title: '',
  description: ''
};

 identity = 'IdYCbkfXhMCkRRkfdAxDizXVRVTnFg5haKOMSp5eslet25+7ItW8W1F9/zjeIfs=';
  loginForm: FormGroup;
  private thing : FormGroup;
  data1: any=[];
data2: any=[];
data3: any=[];
data4: any=[];
ionicblank=false;
  categoriesView: any[]=[];
  categories:any[]=[];
  registerForm: FormGroup;
  submitted = false;
  private todo : FormGroup;
  
  @ViewChild('signupSlider') signupSlider: any;
 
  slideOneForm: FormGroup;
  slideTwoForm: FormGroup;

  submitAttempt: boolean = false;
  constructor( private formBuilder: FormBuilder , private __service: LoginService,public loadingController:LoadingController) {
    this.thing = this.formBuilder.group({
      title: ['', Validators.required],
      details: ['', Validators.required],
    });

    ///

   }



  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      name: ['lakshmi', Validators.required],
      password: ['123456', [Validators.required, Validators.minLength(6)]]
  });

    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
  }, {
      validator: MustMatch('password', 'confirmPassword')
  });
  this.todo = this.formBuilder.group({
    title: ['', Validators.required],
    description: [''],
  });
  }
  get f() { return this.registerForm.controls; }
  get loginf() { return this.loginForm.controls; }
 
onSubmitlogin(){
  this.submitted = true;

  // stop here if form is invalid
  if (this.loginForm.invalid) {
      return;
      this.ionicblank=false;
  }
  // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.loginForm.value));
  if(this.loginForm.value.name==='lakshmi' && this.loginForm.value.password==='123456'){
     debugger;
     this.getData();
     this.practicedata();
  }
}
async getData() {
  const loading = await this.loadingController.create({
    message: 'Loading'
  });
  await loading.present();
  this.ionicblank=true;
  this.__service.getData()
    .subscribe(res => {
      console.log(res);
      this.data1 = res[0];
      this.data2 = res[1];
      this.data3 = res[2];
      this.data4 = res[3];
      loading.dismiss();
    }, err => {
      console.log(err);
      loading.dismiss();
    });
}




practicedata(){
  let obj={"V":"{\"userid\":\"2063569960389177\",\"grade\":\"8\",\"locale\":\"IN\",\"concept_key\":\"8/Pre-Algebra /Radicals And Integer Exponents/Multiply and Divide with Powers of Ten\",\"problem_level\":\"6\"}","K":"03d08307-82bc-47fb-a93e-9ae74c29554a","H":"a7336471db39f014323e7436e2e078626e8f6dcd57d50f4d72f0a9c6908efd84","C":1000};
  this.__service.getPracticeData(obj).subscribe(res =>{
      this.categories= res;
      this.checkResponseIntegrity(res);
  });
}
 checkResponseIntegrity(input) {
  try {
    let response = (input);
    if (response.V === "") return null;
    if (this.hmac_sha256(response.V, response.K) == response.H) {
      debugger;
      // this.base64.encodeFile(response.V).then((base64File:string) => {
      //   console.log(base64File);
      // }, (err) => {
      //   console.log(err);
      // });
      console.log(CryptoJS.Base64ToUInt8(response.V));
      return response.V;
    }
  } catch (err) {
    console.log(err);
  }
  return null;
}
 hmac_sha256 (input_string, key_string) {
  try {
    console.log(CryptoJS.HmacSHA256(input_string, this.identity + key_string).toString());
    return CryptoJS.HmacSHA256(input_string, this.identity + key_string);
  } catch (err) {
    console.log(err);
  }
}


}
