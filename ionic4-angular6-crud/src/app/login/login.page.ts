import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Login} from './login.interface';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MustMatch } from '../helpval/mismatch';
import { LoginService } from '../login/login.service';
import { LoadingController } from '@ionic/angular';
import { observable} from 'rxjs';
import CryptoJS from 'crypto-js';
import 'rxjs';
import { KatexOptions } from 'ng-katex';
import * as ByteBuffer from "bytebuffer"
import { DomSanitizer} from '@angular/platform-browser';
import * as proto from '../../assets/js/proto.min.js';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {  
    typeofqus:any='';
    answerobject:any=[];
options: KatexOptions = {
  displayMode: true,
};
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
////////
  categoriesView: any[]=[];
  categories:any[]=[];
  registerForm: FormGroup;
  submitted = false;
  private todo : FormGroup;
    @ViewChild('signupSlider') signupSlider: any;
   slideTwoForm: FormGroup;
  equationTexString='\\sum_{i=1}^nx_i';
    submitAttempt: boolean = false;
  constructor( private formBuilder: FormBuilder , private __service: LoginService,public loadingController:LoadingController,
    public __Sanitizer:DomSanitizer)
     {
    ///

    this.slideTwoForm = formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*')])],
      privacy: ['', Validators.required],
      bio: ['']
  });
   }
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
  // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.loginForm.value));
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
      debugger;
     this.thing=atob(response.V);
      var base64 =response.V;
      let buf = this.base64ToBuffer(base64);
      let arr = Array.prototype.slice.call(buf);
      debugger;
      data=(proto.brain.ProblemDBBatchView.decode(arr));
      console.log(data); 
    //   this.thing = data.rows;
    this.getanswerandqueastions(data.rows[0]);
      console.log(data);
    }
  } catch (err) {
    console.log(err);
  }
  return null;
}


 hmac_sha256 (input_string, key_string) {
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
getStatement(statement) {
    var possibilities = { "E": 0, "F": 1, "B": 2, "M": 3 };
    var local_statement = "";
    statement.formated = statement.formated.replace(/\\text{}/g, "");
    for (var pos = 0; pos < statement.formated.length; pos++) {
        if (statement.formated.charAt(pos) == "?") {
            pos++;
            var possibility;
            if (pos < statement.formated.length)
                possibility = possibilities[statement.formated.charAt(pos)];
            if (possibility != undefined) {
                pos++;
                if (possibility == 3) { 
                    // replacing multiple choice
                    local_statement += "_________";
                } else { 
                    // replacing the rest
                    var num_str = "";
                    for (; !isNaN(parseInt(statement.formated.charAt(pos))); pos++) {
                        num_str += statement.formated.charAt(pos);
                    }
                    // var is_complete = (statement.formated.charAt(pos) == '}');
                    var is_complete = (statement.formated.length == pos);
                    if (!is_complete) pos--;
                    switch (possibility) {
                        case 0:
                            // if (is_complete) {
                            //     local_statement += "}" + statement.expression[num_str];
                            // } else {
                            //     local_statement += "}" + statement.expression[num_str] + "\\text{"
                            // }
                            local_statement += "$$ " + statement.expression[num_str] + "$$";
                            break;
                        case 1:
                            if (is_complete)
                                // local_statement += "}";
                                local_statement += " $$";
                            break;
                        case 2:
                            if (is_complete)
                                local_statement += "_________";
                            else
                                local_statement += "_________";
                            break;
                        default:
                            break;
                    }
                }
            } else {
                local_statement += "?";
                pos--;
            }
        } else {
            local_statement += statement.formated.charAt(pos);
        }
    }
    return local_statement;
}
 writeQuestionAssess(questionString) {
 
}
 writeQuestionWithMathML_practice(element, statement) {
  
    
}
 writeQuestion(question_string) {

    this.writeQuestionWithMathML_practice("question", question_string);

}
 draw_geometry_figure(figure, figure_div_id, board_id, is_geo_option) {

}
 draw_geometry_graph(figure, figure_div_id, board_id, is_geo_option) {   
   
}
writeQuestionStatement(statement) {
    let question_string='';
   if (statement.figure.length === 0 && this.modes.is_in_practice)
       ///clearAnswerPart(); bbhh
    question_string = this.getStatement(statement);
   if(this.modes.is_in_assess && !this.modes.is_in_review_mode)
       this.writeQuestionAssess(question_string);
   else
       this.writeQuestion(question_string);
   for (var i = 0; i < statement.figure.length; i++) {
       this.draw_geometry_figure(statement.figure[i], "geometry_question", "board",undefined);
       // TODO : to add multiple figure support
   }
   if(statement.graph != null) {
       this.draw_geometry_graph(statement.graph, "geometry_question", "board",undefined);
       // TODO : to add multiple figure support
   }
}

getanswerandqueastions(problem_db_item){
    debugger;
    this.answer_type=problem_db_item.solutions.answer_type;
    // this.writeQuestionStatement(problem_db_item.problem.statement_problem);

    switch(problem_db_item.solutions.answer_type){
        case 'AT_STEPS': 
        this.questionstring=problem_db_item.problem.statement_problem.formated+""+problem_db_item.problem.statement_problem.expression[0];
        this.log_problem_id = problem_db_item.key;
        break;
        case 'AT_MC_SINGLE': 
        this.questionstring=problem_db_item.problem.mc_problem.mc_statement.formated;
        this.log_problem_id = problem_db_item.key;
       this.answerobject=problem_db_item.problem.mc_problem.option;
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
    let data =[];
    this.answer_type=typeques;
    switch(typeques){
        case 'athintsteps':
         data= 
            [{ "question" : { "questionText" : "\\text{Shyam left a <p id=s0>container of flour weighing 5 kg</p> in the kitchen.  If <p id=s1>342 g of flour was eaten</p>, how many grams of flour is left in the container?}" }, "solution" : [ { "step" : [ { "stepId" : 0, "fillInBlanks" : { "fillUpData" : { "stepText" : "\\text{The amount of flour left over in the container is? ?B0 g}" }, "answers" : [ "4658" ] } }, { "hintStep" : [ { "fillInBlanks" : { "fillUpData" : { "stepText" : "\\text{How much does the container of flour weigh? ?B0 kg}" }, "answers" : [ "5" ] } }, { "plainStep" : { "stepText" : "\\text{As the weight of the flour in the container is in kg and the amount of flour left over is in g, let's convert kg to g.}" } }, { "fillInBlanks" : { "fillUpData" : { "stepText" : "\\text{1 kg is how many g? ?B0}" }, "answers" : [ "1000" ] } }, { "plainStep" : { "stepText" : "\\text{To convert 5 kg to grams, multiply 5 with the conversion factor, which is 5 * 1000}" } }, { "fillInBlanks" : { "fillUpData" : { "stepText" : "\\text{So, 5 kg is ?B0 g}" }, "answers" : [ "5000" ] } }, { "fillInBlanks" : { "fillUpData" : { "stepText" : "\\text{How many grams of flour was eaten? ?B0 g}" }, "answers" : [ "342" ] } } ], "stepId" : 1, "fillInBlanks" : { "fillUpData" : { "stepText" : "\\text{Now, calculate the amount of flour left in the container. It is ?B0 g}" }, "answers" : [ "4658" ] } }, { "hintStep" : [ { "plainStep" : { "stepText" : "\\text{To get the amount of flour left over, subtract the quantity eaten from the original quantity. It is, 5000 - 342}" } } ], "stepId" : 2, "fillInBlanks" : { "fillUpData" : { "stepText" : "\\text{So, the amount of flour left in the container is ?B0 g}" }, "answers" : [ "4658" ] } } ] } ], "source" : { "questionSource" : "RD SHARMA", "validatedBy" : "templates", "enteredBy" : "thirdleap_templates" }, "answerType" : "AT_HINT_STEPS", "template" : { "templateKey" : 2, "enteredThrough" : "UI" }, "problemId" : "3", "subject" : [ { "firstAttemptPercentage" : 0, "grade" : 4, "numOfTimesAttempted" : 0, "curriculum" : "CBSE", "syllabus" : { "category" : "Unit Conversions", "concept" : "Add and Subtract Mass", "area" : "Measurement and Data" }, "avgTimeSpent" : 0, "importantExam" : "" } ] }
            ];

         console.log(data);
         this.questionstring=data[0].question.questionText;
         if(this.questionstring.indexOf('\\text{')!==-1){
            this.questionstring=this.questionstring.replace('\\text{','');
         }
        this.log_problem_id = data[0].problemId;
        this.answerobject=data[0].solution[0].step;
        break;
        case 'atsteps':
         data=[  
            {  "question" : { "questionText" : "\\text{Simplify  and write the answer in ex}p\\text{onential form: }\\left(9^{4}\\right)^{5} \\div9^{5}\\text{ }" }, "solution" : [ { "step" : [ { "plainStep" : { "stepText" : "\\frac{\\left(9^{4}\\right)^{5}}{9^{5}}" }, "stepId" : 0 }, { "plainStep" : { "stepText" : "Use \\left(a^m\\right)^n=a^{m\\times n}" }, "stepId" : 1 }, { "plainStep" : { "stepText" : "\\frac{\\left(9^{4}\\right)^{5}}{9^{5}}=\\frac{9^{4\\times5}}{9^{5}} " }, "stepId" : 2 }, { "hintStep" : [ { "plainStep" : { "stepText" : "\\text{Use \\frac{a^m}{a^n}=a^{m-n}}" } } ], "plainStep" : { "stepText" : "\\frac{9^{20}}{9^{5}} " }, "stepId" : 3 }, { "plainStep" : { "stepText" : "9^{20-5}" }, "stepId" : 4 }, { "plainStep" : { "stepText" : "9^{15}" }, "stepId" : 5 } ] } ], "source" : { "questionSource" : "RD SHARMA", "validatedBy" : "ravi", "enteredBy" : "k" }, "answerType" : "AT_STEPS", "template" : { "templateKey" : 8, "enteredThrough" : "UI" }, "problemId" : "4", "subject" : [ { "firstAttemptPercentage" : 0, "grade" : 7, "numOfTimesAttempted" : 0, "curriculum" : "CBSE", "syllabus" : { "category" : "Exponents", "concept" : "Multiply and Divide Powers with Same Base", "area" : "Pre-Algebra" }, "avgTimeSpent" : 0, "importantExam" : "" } ] }

         ];
         console.log(data);
         this.questionstring=data[0].question.questionText;
         if(this.questionstring.indexOf('\\text{')!==-1){
            this.questionstring=this.questionstring.replace('\\text{','');
         }
         this.log_problem_id = data[0].problemId;
         this.answerobject=data[0].solution[0].step;
        break;
        case 'atwordprblms':
         data=[
            {  "question" : { "questionText" : "\\text{Check if 547218 is divisible by 9 }\\left(\\text{type 1 for Yes or 2 for No}\\right)\\text{}" }, "solution" : [ { "step" : [ { "plainStep" : { "stepText" : "\\text{ }" }, "stepId" : 0 }, { "plainStep" : { "stepText" : "\\text{A number is divisible by 9 if the sum of its digits is divisible by 9}" }, "stepId" : 1 }, { "plainStep" : { "stepText" : "\\text{Sum of digits of the number = 5 + 4 + 7 + 2 + 1 + 8 = 27}" }, "stepId" : 2 }, { "plainStep" : { "stepText" : "\\text{As 27 is divisible by 9. we can say the number is divisible by 9. So, the answer is 1 }\\left(\\text{type 1 for Yes or 2 for No}\\right)\\text{}" }, "stepId" : 3 } ] } ], "source" : { "questionSource" : "RD SHARMA", "validatedBy" : "ravi", "enteredBy" : "lakshmi" }, "answerType" : "AT_WORD_PROBLEM_STEPS", "template" : { "templateKey" : 0, "enteredThrough" : "UI" }, "problemId" : "1", "subject" : [ { "firstAttemptPercentage" : 0, "grade" : 6, "numOfTimesAttempted" : 0, "curriculum" : "CBSE", "syllabus" : { "category" : "Factors and Multiples", "concept" : "Check Divisibility", "area" : "Numbers And Operations" }, "avgTimeSpent" : 0, "importantExam" : "" } ] }
            ];
            console.log(data);
            this.questionstring=data[0].question.questionText;
            if(this.questionstring.indexOf('\\text{')!==-1){
                this.questionstring=this.questionstring.replace('\\text{','');
             }
            this.log_problem_id = data[0].problemId;
            this.answerobject=data[0].solution[0].step;
        break;
     
        case 'atmcsingle':
        case 'AT_MC_SINGLE':
        data=[{  "question" : { "questionText" : "\\text{Choose an option to fill in the blank: -4 + _________ = 0}" }, "solution" : [ { "step" : [ { "mcqOptions" : { "optionData" : [ { "stepText" : "4" }, { "stepText" : "-4" }, { "stepText" : "0" } ] } } ] } ], "source" : { "questionSource" : "RD SHARMA", "validatedBy" : "templates", "enteredBy" : "thirdleap_templates" }, "answerType" : "AT_MC_SINGLE", "template" : { "templateKey" : 11, "enteredThrough" : "UI" }, "problemId" : "2", "subject" : [ { "firstAttemptPercentage" : 0, "grade" : 6, "numOfTimesAttempted" : 0, "curriculum" : "CBSE", "syllabus" : { "category" : "Integers", "concept" : "Add Integers", "area" : "Numbers And Operations" }, "avgTimeSpent" : 0, "importantExam" : "" } ] }];
         console.log(data);
         this.questionstring=data[0].question.questionText;
         if(this.questionstring.indexOf('\\text{')!==-1){
            this.questionstring=this.questionstring.replace('\\text{','');
         }
         this.log_problem_id = data[0].problemId;
         this.answerobject=data[0].solution[0].step[0].mcqOptions.optionData;
        break;
     
    }
}
}