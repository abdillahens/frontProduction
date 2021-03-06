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
  selector: 'app-stress',
  templateUrl: './stress.component.html',
  styleUrls: ['./stress.component.css']
})
export class StressComponent implements OnInit {

  public profile = "../assets/img/contact.png";
  public user = {
    date_naissance: '',
    id : 0,
  email: '',
  nom: '',
  numero_tele: '',
  prenom: '',
  profession: '',
  adresse: '',
  role: '',
  picture:'',
  niveauScolaire:''
  };
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
      this.message2 = "la taille du photo doit ??tre inf??rieure ?? 1 Mo !"
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
    let response = {"user_id" : this.user.id, "test_id" : "1",
    "question" : [
      {"id" : 1, "user_answer" : {"id" : this.form.value.Q1}},
      {"id" : 2, "user_answer" : {"id" : this.form.value.Q2}},
      {"id" : 3, "user_answer" : {"id" : this.form.value.Q3}},
      {"id" : 4, "user_answer" : {"id" : this.form.value.Q4}},
      {"id" : 5, "user_answer" : {"id" : this.form.value.Q5}},
      {"id" : 6, "user_answer" : {"id" : this.form.value.Q6}},
      {"id" : 7, "user_answer" : {"id" : this.form.value.Q7}},
      {"id" : 8, "user_answer" : {"id" : this.form.value.Q8}},
      {"id" : 9, "user_answer" : {"id" : this.form.value.Q9}},
      {"id" : 10, "user_answer" : {"id" : this.form.value.Q10}}
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
          // console.log(token);
          (await this._test.getTest(1)).subscribe(
    res=>{
      this.message='';
      
      if(res.message){
        this.message = "vous avez pass?? ce test , veuillez attendre jusqu'?? la fin de traitement de votre test pr??c??dant";
        this.uploading=false;
        return ;
      }
      this.test = res.question;
      console.log(this.test)
      this.uploading = false;},
    err=>{
      setTimeout(() => {
        this.refresh =true;
      }, 3000);
      console.log(err)}
  )

// await this._test.getTest2();

       
  this.form = this.formBuilder.group({
    Q1: ['', Validators.required],
    Q2: ['', Validators.required],
    Q3: ['', Validators.required],
    Q4: ['', Validators.required],
    Q5: ['', Validators.required],
    Q6: ['', Validators.required],
    Q7: ['', Validators.required],
    Q8: ['', Validators.required],
    Q9: ['', Validators.required],
    Q10: ['', Validators.required]
    });
    }

}
