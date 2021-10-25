import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import {Pipe, PipeTransform} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GestionClientService } from '../gestion-client.service';
import { AdminClientSideComponent } from '../admin-client-side/admin-client-side.component';
import { HomeComponent } from '../home/home.component';
import { GestionTestService } from '../gestion-test.service';
declare var $ :any;
@Component({
  selector: 'app-depression',
  templateUrl: './depression.component.html',
  styleUrls: ['./depression.component.css']
})
export class DepressionComponent implements OnInit {

  public profile = "../assets/img/contact.png";
  public user = {date_naissance: '',id : 0,email: '',nom: '',numero_tele: '',prenom: '',profession: '',adresse: '',role: '',picture:'',niveauScolaire : ""};
  uploading : boolean = true;
  refresh : boolean = false;
  selectedFile = null;
  public static clients : Array<any> = [];
  client = 0; 
  public static clt : any;
  clt= this.clientsValue();
  test: any;
  form: FormGroup = new FormGroup({});
  message: any;
  uploaded=false;
  message2='';
  constructor(private _auth : AuthService,private _Client : GestionClientService,private _router : Router,private http: HttpClient ,private formBuilder: FormBuilder,private _test : GestionTestService) {}
 
  private image: File = new File(["foo"], "foo.txt");
  public charged = true;

  

  selectImg(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) {
      return;
    }
    this.image = input.files[0];
    this.charged = false;
  }
  
  public changePhoto(){
    
    console.log(this.image.size > 1000000)

    if(this.image.size > 1000000){
      this.message2 = "la taille du photo doit étre inférieure à 1 Mo !"
      return;
    }

    this.message2='';
    this.uploaded=true;
    const formDataProfile = new FormData();
    formDataProfile.append('file', this.image);
    this._auth.uploadProfile(this.user.id,formDataProfile).subscribe(
      
      res=>{

        this.uploaded = false;
        (document.getElementById('myImage3') as HTMLFormElement).src = res.src;
        console.log("uplaod sucess")
        $('#addPhoto').modal('hide');
        location.reload();
        
      },err=>{this.uploaded = false;this.message2="veuillez ressayer utlterierement";console.log('upload failled');console.log(err)}
      );
    

  }


  public editPhoto(){
    $('#exampleModalCenter').modal('show');
  }
  public addPhoto(){
    $('#exampleModalCenter').modal('hide');
    $('#addPhoto').modal('show');
  }
    submitted = false;
  public submit(){
    this.submitted=true;
    if (this.form.invalid) {
      return;
  }
    let response = {"user_id" : this.user.id, "test_id" : "3",
    "question" : [
      {"id" : 18, "user_answer" : {"id" : this.form.value.Q18}},
      {"id" : 19, "user_answer" : {"id" : this.form.value.Q19}},
      {"id" : 20, "user_answer" : {"id" : this.form.value.Q20}},
      {"id" : 21, "user_answer" : {"id" : this.form.value.Q21}},
      {"id" : 22, "user_answer" : {"id" : this.form.value.Q22}},
      {"id" : 23, "user_answer" : {"id" : this.form.value.Q23}},
      {"id" : 24, "user_answer" : {"id" : this.form.value.Q24}},

    ]};

    $('#modalWaiting').modal('show');

    this._test.setResponse(response).subscribe(
      res=>{
        $('#modalWaiting').modal('hide');
        console.log(res);
        this.message = res.message;
        $('#myModal').modal('show');
        setTimeout(() => {
          $('#myModal').modal('hide');
          this._router.navigate(['/home']);
        }, 5000);
      },
      err=>console.log(err)
    );

  }
  public refreshUrl(){
    window.location.reload();
  }
   
    public clientsValue(){
      
      return this.user;
    }

    
    get f() { return this.form.controls; }
    async ngOnInit(): Promise<void> {

      this._auth.getInformation().subscribe(
        res => {
          this.user = res;
        },
        err => {
          if(err instanceof HttpErrorResponse){
             console.log(err)
          }});
          (await this._test.getTest(3)).subscribe(
    res=>{
      this.message='';
      
      if(res.message){
        this.message = "vous avez passé ce test , veuillez attendre jusqu'à la fin de traitement de votre test précédant";
        this.uploading=false;
        return ;
      }
      console.log(res);
      this.test = res.question;
      // console.log(this.test);
      this.uploading = false;
    },
    err=>{
      setTimeout(() => {
        this.refresh =true;
      }, 3000);
      console.log(err)}
  )

// await this._test.getTest2();

       
  this.form = this.formBuilder.group({
    Q18: ['', Validators.required],
    Q19: ['', Validators.required],
    Q20: ['', Validators.required],
    Q21: ['', Validators.required],
    Q22: ['', Validators.required],
    Q23: ['', Validators.required],
    Q24: ['', Validators.required],
    });
    }
    
    

}
