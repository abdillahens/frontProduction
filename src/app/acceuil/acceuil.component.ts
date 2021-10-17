import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { AuthService } from '../auth.service';
declare var $ :any;
@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.css']
})


export class AcceuilComponent implements OnInit {
  TELE: String="";
  registerForm: any;
  loginForm :any;
  public user !: SocialUser ;
  message: any;
  confirm: boolean | undefined;
  EmailExist: boolean =false;
  submitted: boolean | undefined;
  loginFailled: boolean = false;
  continueForm: any;
  password: any;



  constructor(private _auth : AuthService,private _router : Router,private formBuilder: FormBuilder,private authService : SocialAuthService) { }

  //////////////// change tele
  public changeTele(){

    //if(this.TELE.length===2) this.TELE+='-';
    if(this.TELE.length===0)this.TELE = '(212)-';
  }

  public signIn(){
    $('#elegantModalFormRegistre').modal('show');
  }
  // public navigate(){

  //   document.getElementById("apropos")?.scrollIntoView({
  //     behavior: 'smooth',
  //     block: 'end',
  //     inline: 'nearest'
  // });
  // }
  //////////////login
  public async loginSubmit(){

    this.submitted = true;
    const {email,password} = this.loginForm.value;
    
    if (this.loginForm.invalid) {
          return;
      }

    this._auth.loginUser(email,password).subscribe(

        res=> {
          localStorage.removeItem('authorization');
          localStorage.setItem('authorization', res.accessToken);
          this.confirm = true;
          $('#elegantModalForm').modal('hide');
          switch(res.role){
                  case  "admin" :   this._router.navigate(['/admin']); break;
                  case "specialiste" :this._router.navigate(['/specialiste/home']);break;
                  case "client" : this._router.navigate(['/home']);break;
                }
        },
        err=>{
          // console.log(err);
          this.loginFailled = true;
          console.log(this.loginFailled);
          // this.message = err?.message;
        }) 
       
  }

  /////////////// registring
  public registreSubmit(){

    // console.log(this.nom,this.prenom,this.sexe,this.date_naissance,this.email,this.tele,this.profession,this.password)
    this.submitted = true;
    const {nom,prenom,sexe,date_naissance,email,tele,profession,niveauScolaire,password} = this.registerForm.value;

    if (this.registerForm.invalid) {
        return;
    }

    this._auth.registreClient(nom,prenom,sexe,date_naissance,email,tele,profession,niveauScolaire,password).subscribe(

      res =>{
        this.message = res.message;
        this.confirm = true;
        $('#elegantModalFormRegistre').modal('hide');
        $('#elegantModalFormSuccess').modal('show');
        setTimeout(() => {
          $('#elegantModalFormSuccess').modal('hide');
            location.reload();
        }, 6000);
      },
      err=> {
        if(err.error.code === "ER_DUP_ENTRY"){
          this.EmailExist = true;
        }
  
      }
    )

  }

  public membre(){
    $('#elegantModalForm').modal('hide');
    $('#elegantModalFormRegistre').modal('show');

  }

  public continueRegistre(){
    
    this.submitted = true;
    const {sexe,email,prenom,nom,date_naissance,tele,profession,niveauScolaire} = this.continueForm.value;
    if (this.continueForm.invalid) {
        return; 
    }

    let id = this.user.id;
    this._auth.continueGoogle({id,email,prenom,nom,sexe,date_naissance,tele,profession,niveauScolaire}).subscribe(
      res=>{
        localStorage.removeItem('authorization');
        localStorage.setItem('authorization', res.accessToken);
        $('#elegantModalFormRegistreContinue').modal('hide');
        this._router.navigate(['/home']);

      },
      err=>{}
    )

  }
  
  async signInGoogle(){
    
    await this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(res=>this.user=res);
     this._auth.loginUserGoogle(this.user.idToken).subscribe(
       
       res=> {

         //localStorage.removeItem('authorization');
         //localStorage.setItem('authorization', res.accessToken);
         $('#elegantModalFormRegistre').modal('hide');
         $('#elegantModalForm').modal('hide');
         this.user=res.user;
         console.log(res.user.niveauScloaire)
         if(!res.user.exist){
          $('#elegantModalFormRegistreContinue').modal('show');
          this.continueForm = this.formBuilder.group({
            nom: [res.user.nom],
            prenom: [res.user.prenom],
            email: [res.user.email],
            tele: ['', [Validators.required,Validators.pattern("^((\\([0-9][0-9][0-9]\\))|(\\([0-9][0-9]\\)))?\\-[0-9]{10}$")] ],
            sexe : ['', [Validators.required]],
            date_naissance : ['', [Validators.required]],
            niveauScolaire : ['', [Validators.required]],
            profession : ['', [Validators.required]] },{
              // validator: this.MustMatch('password', 'confirmPassword')
            });
         }
          else{
            console.log("loign with ggoogle")
            localStorage.removeItem('authorization');
            localStorage.setItem('authorization', res.accessToken);
            this._router.navigate(['/home']);
          }
       },
       err=>{
         console.log(err.error);
       }) 
     
   }

get f() { return this.registerForm.controls; }
get f2() { return this.loginForm.controls; }
get f3(){return this.continueForm.controls;}

private blue(): ValidatorFn {  
  return (control: AbstractControl): { [key: string]: any } | null =>  
      control.value === this.password
          ? null : {mutchPass: control.value};
}


  ngOnInit(): void {

    this.registerForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      tele: ['', [Validators.required,Validators.pattern("^((\\([0-9][0-9][0-9]\\))|(\\([0-9][0-9]\\)))?\\-[0-9]{10}$")] ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['', [Validators.required,this.blue()]],
      sexe : ['', [Validators.required]],
      date_naissance : ['', [Validators.required]],
      niveauScolaire : ['', []],
      profession : ['', [Validators.required]] },{
        // validator: this.MustMatch('password', 'confirmPassword')
      });
      this.continueForm = this.formBuilder.group({
        nom: ['', Validators.required],
        prenom: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        tele: ['', [Validators.required,Validators.pattern("^((\\([0-9][0-9][0-9]\\))|(\\([0-9][0-9]\\)))?\\-[0-9]{10}$")] ],
        sexe : ['', [Validators.required]],
        date_naissance : ['', [Validators.required]],
        niveauScolaire : ['', [Validators.required]],
        profession : ['', [Validators.required]] },{
          
        });
      this.loginForm = this.formBuilder.group({

        email: ['', [Validators.required]],
        password: ['', [Validators.required]],
        });
  }

}
