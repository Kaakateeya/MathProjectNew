import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Login} from './login.interface';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MustMatch } from '../helpval/mismatch';
import { LoginService } from '../login/login.service';
import { LoadingController, AngularDelegate } from '@ionic/angular';
import { observable} from 'rxjs';
import CryptoJS from 'crypto-js';
import 'rxjs';
import { KatexOptions } from 'ng-katex';
import * as ByteBuffer from "bytebuffer"
import { DomSanitizer} from '@angular/platform-browser';
import * as proto from '../../assets/js/proto.min.js';
// import * as MQa from '../../assets/js/mathquill.js';
import {MathQuillLoader} from 'mathquill-typescript';
import * as $ from 'jquery';
import {IMathQuill} from 'mathquill-typescript';
import {MathquillEditorOptions} from './login.interface';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit { 
    answersss='';
    indexvalue=1;
    questionanswers=[];
    lengthanswer: number=0;
    array:any=[];
   options: MathquillEditorOptions;
    mqI: IMathQuill; 
    hintstepindex=0;     
    @ViewChild('editableMath') editableMath: ElementRef;
      latexSource: string;
 @ViewChild('questiondiv') public questiondiv: ElementRef;
 @ViewChild('answer_labeldiv') public answer_labeldiv: ElementRef;
 typeofqus:any='';
 answerobject:any=[];
 optionss: KatexOptions = {
  displayMode: true,
};
answerimg:any='';
 identity = 'IdYCbkfXhMCkRRkfdAxDizXVRVTnFg5haKOMSp5eslet25+7ItW8W1F9/zjeIfs=';
loginForm: FormGroup;
selectedItemradio: any;
model = new Login('','');
thing : any='';
data1: any=[];
data2: any=[];
data3: any=[];
data4: any=[];
ionicblank=false;
viewMode='first';
answer_type: any ='';
resultSolution = []
long_addition_solution: any ='';
hint_counter=0;
 stepNow = 0;
 log_problem_id='';
 is_last_qn: any;
 is_last_question=false;
 step_index=0;
 problem_log=[[]];
 start_time:any;
 student_log: any=[];
 user_activity: any={};
 pop_activity=false;
 user_activity_end=false;
 is_text_problem = false
 text_final_step:any;
 max_word_problem_steps:any;
 autoManufacturers:any;
 questionstring: any='';
 athintsteps='';
 modes = { is_in_homework : false,is_in_learn : false, is_in_practice : false, is_in_assess : false, is_in_progress: false, is_in_review_mode: false };
 @ViewChild('answerdiv') public answerdiv:ElementRef;
////////
  categoriesView: any[]=[];
  categories:any[]=[];
  registerForm: FormGroup;
  submitted = false;
  private todo : FormGroup;
  MQ:any={};
 @ViewChild('signupSlider') signupSlider: any;
slideTwoForm: FormGroup;
equationTexString="\sum_{i=1}^nx_i";
submitAttempt: boolean = false;
answer_label='';  
constructor( private formBuilder: FormBuilder , private __service: LoginService,public loadingController:LoadingController,
    public __Sanitizer:DomSanitizer)
    {  
      
    let optionat:any ={};
    optionat.mode='.min';
    MathQuillLoader.loadMathQuill({},mathquill=> {
      console.log(mathquill.getInterface(2));
      this.MQ=mathquill.getInterface(2);
    });
    this.slideTwoForm = formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*')])],
      privacy: ['', Validators.required],
      bio: ['']
  });
  
  __service.mqpromise.then((mq: IMathQuill) => {
    this.mqI = mq.getInterface(2);
  });
  
   } 
//     clicked(insert: string) {
//     this.mqI.MathField(this.editableMath.nativeElement).write(insert);
//     this.refreshLatex();
//   }

//   refreshLatex() {
//     const innerLatexMath = this.mqI.MathField(this.editableMath.nativeElement);
//     const latex = innerLatexMath.latex();
//     this.latexSource = latex;
//   };

 next(){
    this.signupSlider.slideNext();
}

prev(){
    this.signupSlider.slidePrev();
}
logForm(){
  console.log(this.todo.value)
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
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
}
onSubmitlogin(){
  this.submitted = true;
  if (this.loginForm.invalid) {
    this.ionicblank=false;
      return;
  }
  this.ionicblank=true;
  if(this.loginForm.value.name==='lakshmi' && this.loginForm.value.password==='123456'){
     this.getData();
     this.practicedata();
  }
}
bufferToBase64(buffer) {
  const binary = String.fromCharCode.apply(null, buffer);
  return window.btoa(binary);
}
 base64ToBuffer(base64) {
  let binstr = atob(base64);
  let buf = new Uint8Array(binstr.length);
  Array.prototype.forEach.call(binstr, function (ch, i) {
    buf[i] = ch.charCodeAt(0);
  });
  return buf;
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
save(){
   this.submitAttempt = true;
  if(!this.slideTwoForm.valid){
      this.signupSlider.slideTo(1);
  }
  else {
      console.log("success!")
      console.log(this.slideTwoForm.value);
  }
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
    let data:any={};
    if (response.V === "") return null;
    if (this.hmac_sha256(response.V, response.K) == response.H) {
     this.thing=atob(response.V);
      var base64 =response.V;
      let buf = this.base64ToBuffer(base64);
      let arr = Array.prototype.slice.call(buf);
      data=(proto.brain.ProblemDBBatchView.decode(arr));
      // this.thing = data.rows;
      this.getanswerandqueastions(data.rows[0]);
      console.log(data);
    }
  } catch (err) {
    console.log(err);
  }
  return null;
}
 hmac_sha256(input_string, key_string) {
  try {
    console.log(CryptoJS.HmacSHA256(input_string, this.identity + key_string).toString());
    return CryptoJS.HmacSHA256(input_string, this.identity + key_string).toString();
  } catch (err) {
    console.log(err);
  }
}
asd(event){
  console.log(event);
}

/***************************** */
getanswerandqueastions(problem_db_item){
    this.loadimageurl();
    this.answer_type=problem_db_item.solutions.answer_type;
      switch(problem_db_item.solutions.answer_type){
        case 'AT_STEPS':       
        this.questionstring=problem_db_item.problem.statement_problem.formated+""+problem_db_item.problem.statement_problem.expression[0];
        this.log_problem_id = problem_db_item.key;
        this.questionBindHtml('ques');
        break;
        case 'AT_MC_SINGLE': 
        this.questionstring=problem_db_item.problem.mc_problem.mc_statement.formated;
        this.log_problem_id = problem_db_item.key;
       this.answerobject=problem_db_item.problem.mc_problem.option;
       this.questionBindHtml('ques');
        break;
        case 'AT_MC_MULTIPLE': 
        break;
        case 'AT_FILL': 
        break;
        case 'AT_MATCHING': 
        break;
        case 'AT_LONG_ADDITION': 
        break;
        case 'AT_LONG_ADDITION': 
        break;
    }
   
    console.log("getQuestionForPracticeMode " + this.answer_type);
}
questiomnchange(typeques){
    var mathFieldSpanss = document.getElementById('math-field');
    var mathFielda = this.MQ.MathField(mathFieldSpanss, {
        spaceBehavesLikeTab: true,
        handlers: {
          edit: function() {
            mathFielda.focus();
          }
        }
      });
    $("#answer_labeldiv").empty();
    this.indexvalue=1;
    this.loadimageurl();
    let data =[];
    this.answer_type=typeques;
    switch(typeques){
        case 'athintsteps':
         data= 
            [{ "question" : { "questionText" : "\\text{Shyam left a <p id=s0>container of flour weighing 5 kg</p> in the kitchen.  If <p id=s1>342 g of flour was eaten</p>, how many grams of flour is left in the container?}" }, "solution" : [ { "step" : [ { "stepId" : 0, "fillInBlanks" : { "fillUpData" : { "stepText" : "\\text{The amount of flour left over in the container is? ?B0 g}" }, "answers" : [ "4658" ] } }, { "hintStep" : [ { "fillInBlanks" : { "fillUpData" : { "stepText" : "\\text{How much does the container of flour weigh? ?B0 kg}" }, "answers" : [ "5" ] } }, { "plainStep" : { "stepText" : "\\text{As the weight of the flour in the container is in kg and the amount of flour left over is in g, let's convert kg to g.}" } }, { "fillInBlanks" : { "fillUpData" : { "stepText" : "\\text{1 kg is how many g? ?B0}" }, "answers" : [ "1000" ] } }, { "plainStep" : { "stepText" : "\\text{To convert 5 kg to grams, multiply 5 with the conversion factor, which is 5 * 1000}" } }, { "fillInBlanks" : { "fillUpData" : { "stepText" : "\\text{So, 5 kg is ?B0 g}" }, "answers" : [ "5000" ] } }, { "fillInBlanks" : { "fillUpData" : { "stepText" : "\\text{How many grams of flour was eaten? ?B0 g}" }, "answers" : [ "342" ] } } ], "stepId" : 1, "fillInBlanks" : { "fillUpData" : { "stepText" : "\\text{Now, calculate the amount of flour left in the container. It is ?B0 g}" }, "answers" : [ "4658" ] } }, { "hintStep" : [ { "plainStep" : { "stepText" : "\\text{To get the amount of flour left over, subtract the quantity eaten from the original quantity. It is, 5000 - 342}" } } ], "stepId" : 2, "fillInBlanks" : { "fillUpData" : { "stepText" : "\\text{So, the amount of flour left in the container is ?B0 g}" }, "answers" : [ "4658" ] } } ] } ], "source" : { "questionSource" : "RD SHARMA", "validatedBy" : "templates", "enteredBy" : "thirdleap_templates" }, "answerType" : "AT_HINT_STEPS", "template" : { "templateKey" : 2, "enteredThrough" : "UI" }, "problemId" : "3", "subject" : [ { "firstAttemptPercentage" : 0, "grade" : 4, "numOfTimesAttempted" : 0, "curriculum" : "CBSE", "syllabus" : { "category" : "Unit Conversions", "concept" : "Add and Subtract Mass", "area" : "Measurement and Data" }, "avgTimeSpent" : 0, "importantExam" : "" } ] }
            ];
         console.log(data);
         this.questionstring=data[0].question.questionText;
         this.log_problem_id = data[0].problemId;
         this.answerobject=data[0].solution[0].step;
        this.answer_label=data[0].solution[0].step[0].fillInBlanks.fillUpData.stepText;
         this.lengthanswer=this.answerobject.length;
         this.questionBindHtml('ques');
         this.questionBindHtml('ans');
        break;
        case 'atsteps':
         data=[  
            {  "question" : { "questionText" : "\\text{Simplify  and write the answer in ex}p\\text{onential form: }\\left(9^{4}\\right)^{5} \\div9^{5}\\text{ }" }, "solution" : [ { "step" : [ { "plainStep" : { "stepText" : "\\frac{\\left(9^{4}\\right)^{5}}{9^{5}}" }, "stepId" : 0 }, { "plainStep" : { "stepText" : "Use \\left(a^m\\right)^n=a^{m\\times n}" }, "stepId" : 1 }, { "plainStep" : { "stepText" : "\\frac{\\left(9^{4}\\right)^{5}}{9^{5}}=\\frac{9^{4\\times5}}{9^{5}} " }, "stepId" : 2 }, { "hintStep" : [ { "plainStep" : { "stepText" : "\\text{Use \\frac{a^m}{a^n}=a^{m-n}}" } } ], "plainStep" : { "stepText" : "\\frac{9^{20}}{9^{5}} " }, "stepId" : 3 }, { "plainStep" : { "stepText" : "9^{20-5}" }, "stepId" : 4 }, { "plainStep" : { "stepText" : "9^{15}" }, "stepId" : 5 } ] } ], "source" : { "questionSource" : "RD SHARMA", "validatedBy" : "ravi", "enteredBy" : "k" }, "answerType" : "AT_STEPS", "template" : { "templateKey" : 8, "enteredThrough" : "UI" }, "problemId" : "4", "subject" : [ { "firstAttemptPercentage" : 0, "grade" : 7, "numOfTimesAttempted" : 0, "curriculum" : "CBSE", "syllabus" : { "category" : "Exponents", "concept" : "Multiply and Divide Powers with Same Base", "area" : "Pre-Algebra" }, "avgTimeSpent" : 0, "importantExam" : "" } ] }

         ];
         console.log(data);
         this.questionstring=data[0].question.questionText;
         this.log_problem_id = data[0].problemId;
         this.answerobject=data[0].solution[0].step;
         this.answer_label=data[0].solution[0].step[0].plainStep.stepText;
         this.questionBindHtml('ques');
         this.questionBindHtml('ans');
        break;
        case 'atwordprblms':
         data=[
            {  "question" : { "questionText" : "\\text{Check if 547218 is divisible by 9 }\\left(\\text{type 1 for Yes or 2 for No}\\right)\\text{}" }, "solution" : [ { "step" : [ { "plainStep" : { "stepText" : "\\text{ }" }, "stepId" : 0 }, { "plainStep" : { "stepText" : "\\text{A number is divisible by 9 if the sum of its digits is divisible by 9}" }, "stepId" : 1 }, { "plainStep" : { "stepText" : "\\text{Sum of digits of the number = 5 + 4 + 7 + 2 + 1 + 8 = 27}" }, "stepId" : 2 }, { "plainStep" : { "stepText" : "\\text{As 27 is divisible by 9. we can say the number is divisible by 9. So, the answer is 1 }\\left(\\text{type 1 for Yes or 2 for No}\\right)\\text{}" }, "stepId" : 3 } ] } ], "source" : { "questionSource" : "RD SHARMA", "validatedBy" : "ravi", "enteredBy" : "lakshmi" }, "answerType" : "AT_WORD_PROBLEM_STEPS", "template" : { "templateKey" : 0, "enteredThrough" : "UI" }, "problemId" : "1", "subject" : [ { "firstAttemptPercentage" : 0, "grade" : 6, "numOfTimesAttempted" : 0, "curriculum" : "CBSE", "syllabus" : { "category" : "Factors and Multiples", "concept" : "Check Divisibility", "area" : "Numbers And Operations" }, "avgTimeSpent" : 0, "importantExam" : "" } ] }
            ];
            console.log(data);
            this.questionstring=data[0].question.questionText;
            this.log_problem_id = data[0].problemId;
            this.answerobject=data[0].solution[0].step;
            this.answer_label=data[0].solution[0].step[0].plainStep.stepText;
            this.questionBindHtml('ques');
            this.questionBindHtml('ans');
        break;
        case 'atmcsingle':
        case 'AT_MC_SINGLE':
        data=[{  "question" : { "questionText" : "\\text{Choose an option to fill in the blank: -4 + _________ = 0}" }, "solution" : [ { "step" : [ { "mcqOptions" : { "optionData" : [ { "stepText" : "4" }, { "stepText" : "-4" }, { "stepText" : "0" } ] } } ] } ], "source" : { "questionSource" : "RD SHARMA", "validatedBy" : "templates", "enteredBy" : "thirdleap_templates" }, "answerType" : "AT_MC_SINGLE", "template" : { "templateKey" : 11, "enteredThrough" : "UI" }, "problemId" : "2", "subject" : [ { "firstAttemptPercentage" : 0, "grade" : 6, "numOfTimesAttempted" : 0, "curriculum" : "CBSE", "syllabus" : { "category" : "Integers", "concept" : "Add Integers", "area" : "Numbers And Operations" }, "avgTimeSpent" : 0, "importantExam" : "" } ] }];
         console.log(data);
         this.questionstring=data[0].question.questionText;
        this.log_problem_id = data[0].problemId;
        this.answerobject=data[0].solution[0].step[0].mcqOptions.optionData;
        let answers=data[0].solution[0].step[0].mcqOptions.optionData;
        // this.answerobject='<div *ngFor="let enum of answers" ><label name="map" for="enum_answer_{{enum.stepText}}"><input id="enum_answer_{{enum.stepText}}" [value]="enum.stepText" type="radio" name="enums" [(ngModel)]="selectedItemradio">{{enum.stepText}}</label></div>';
        // this.mqI.StaticMath(this.answerdiv.nativeElement).latex(this.answerobject);
        // const innerLatexMath = this.mqI.StaticMath(this.answerdiv.nativeElement).latex(this.answerobject);
        // innerLatexMath.latex();
        this.answer_label='';
        this.questionBindHtml('ques');
        this.questionBindHtml('ans');
        break;
        case 'atgraphs':
        this.loadimageurl();
        this.answer_label='';
        this.questionBindHtml('ans');
        break;
     
    }
}
questionBindHtml(type){
    if(type=='ques'){
        let problemSpana = document.getElementById('questionstring');
        var mathField =  this.MQ.MathField(problemSpana, {
           spaceBehavesLikeTab: false, // configurable
           leftRightIntoCmdGoes: 'up',
           restrictMismatchedBrackets: true,
           sumStartsWithNEquals: true,
           supSubsRequireOperand: true,
           charsThatBreakOutOfSupSub: '+-=<>',
           autoSubscriptNumerals: true,
           autoCommands: 'pi theta sqrt sum',
           autoOperatorNames: 'sin cos',
           redraw:false,
           substituteTextarea: function() {
             return document.createElement('div');
           }
         });
        // mathField.latex(this.questionstring);
        // mathField.latex(); 
     
        // const innerLatexMath = this.mqI.StaticMath(this.questiondiv.nativeElement).latex(this.questionstring);
        // innerLatexMath.latex();
  
        $( "#questionstring" ).html(this.questionstring);
         var problemSpan = document.getElementById('questionstring');
        this.MQ.StaticMath(problemSpan);
    }
    else{
        this.questionanswers.push(this.answer_label);
        debugger;
        let problemSpana = document.getElementById('answer_labeldiv');
        var mathFieldS =  this.MQ.MathField(problemSpana, {
           spaceBehavesLikeTab: false, // configurable
           leftRightIntoCmdGoes: 'up',
           restrictMismatchedBrackets: true,
           sumStartsWithNEquals: true,
           supSubsRequireOperand: true,
           charsThatBreakOutOfSupSub: '+-=<>',
           autoSubscriptNumerals: true,
           autoCommands: 'pi theta sqrt sum',
           autoOperatorNames: 'sin cos', 
           redraw:false,
           substituteTextarea: function() {
             return document.createElement('div'); 
           }
         });
        // mathField.write(this.answer_label);
        // mathField.latex(); 
        
        this.answer_label=this.answer_label.replace('?B0' , '____');
        // const innerLatexMath = this.mqI.MathField(document.getElementById('answer_labeldiv')).latex(""+this.answer_label);
        // innerLatexMath.latex();
         var mathFieldSpans = $('<p>'+this.answer_label+'</p>');
        var mathFields = this.mqI.StaticMath(mathFieldSpans[0]);
        mathFieldSpans.appendTo(document.getElementById('answer_labeldiv'));
        mathFields.reflow();
        $('<br>').appendTo(document.getElementById('answer_labeldiv'));
    }
   
}
loadimageurl(){
    let url='../../assets/images/ec_piechart_status.png';
    const loadBase64Image = (url) => fetch(url)
  .then(response => response.blob())
  .then(base64Data => {
    let reader = new FileReader()
    reader.onloadend = () => { 
    this.answerimg=reader.result;
    }
    reader.onerror = (e) => console.error(e);
    reader.readAsDataURL(base64Data)
  });
  loadBase64Image(url);
}
nexthintbtn(){
       switch(this.answer_type){
        case 'athintsteps':
         this.commonhintsteps();
        break;
        case 'atsteps':
        if(this.indexvalue<this.answerobject.length){
        this.answer_label=this.answerobject[this.indexvalue].plainStep.stepText; 
        this.indexvalue=this.indexvalue+1;
        this.questionBindHtml('ans');
        }
        // this.commonhintsteps();
        break;
        case 'atwordprblms':
        if(this.indexvalue<this.answerobject.length){
            this.answer_label=this.answerobject[this.indexvalue].plainStep.stepText; 
            this.indexvalue=this.indexvalue+1;
            this.questionBindHtml('ans');
            }
        // this.commonhintsteps();
        break;
        case 'atmcsingle':
        case 'AT_MC_SINGLE':
        this.questionBindHtml('ques');
        break;
         }
}
 commonhintsteps(){
    // $( "#answer_labeldiv").html().replace('____', this.answersss+'<label class="fb_card">____</label>');
    if(this.indexvalue<this.answerobject.length){
        if(this.answerobject[this.indexvalue].hintStep!==undefined && this.answerobject[this.indexvalue].hintStep.length>0){
         if(this.hintstepindex<this.answerobject[this.indexvalue].hintStep.length)
         {
         if(this.answerobject[this.indexvalue].hintStep[this.hintstepindex].fillInBlanks!==undefined){
            this.answer_label=this.answerobject[this.indexvalue].hintStep[this.hintstepindex].fillInBlanks.fillUpData.stepText;
            this.answersss=this.answerobject[this.indexvalue].hintStep[this.hintstepindex].fillInBlanks.answers[0];
           this.questionBindHtml('ans');
           this.hintstepindex=this.hintstepindex+1;

         }
         else if(this.answerobject[this.indexvalue].hintStep[this.hintstepindex].plainStep!==undefined){
             this.answer_label=this.answerobject[this.indexvalue].hintStep[this.hintstepindex].plainStep.stepText;
             this.hintstepindex=this.hintstepindex+1;
             this.questionBindHtml('ans');
             debugger;
             if(this.answerobject[this.indexvalue].hintStep[this.hintstepindex]!==undefined && this.answerobject[this.indexvalue].hintStep[this.hintstepindex].fillInBlanks!==undefined){
                 this.answer_label=this.answerobject[this.indexvalue].hintStep[this.hintstepindex].fillInBlanks.fillUpData.stepText;
                 this.answersss=this.answerobject[this.indexvalue].hintStep[this.hintstepindex].fillInBlanks.answers[0];
                 this.questionBindHtml('ans');
                 this.hintstepindex=this.hintstepindex+1;
             }
             else if(this.answerobject[this.indexvalue].fillInBlanks!==undefined){
                 this.answer_label=this.answerobject[this.indexvalue].fillInBlanks.fillUpData.stepText;
                 this.answersss=this.answerobject[this.indexvalue].fillInBlanks.answers[0];
                 this.questionBindHtml('ans');
                 this.indexvalue=this.indexvalue+1;
                 this.hintstepindex=this.hintstepindex+1;
             }
          }
          
         }    
         else{
             this.answer_label=this.answerobject[this.indexvalue].fillInBlanks.fillUpData.stepText; 
             this.answersss=this.answerobject[this.indexvalue].fillInBlanks.answers[0];
             this.indexvalue=this.indexvalue+1;
             this.questionBindHtml('ans');
             this.hintstepindex=0;
         }
        }
        else{
       
         this.answer_label=this.answerobject[this.indexvalue].fillInBlanks.fillUpData.stepText; 
         this.answersss=this.answerobject[this.indexvalue].fillInBlanks.answers[0];
         this.indexvalue=this.indexvalue+1;
         this.questionBindHtml('ans');
         this.hintstepindex=0;
        }
     }
 }
}