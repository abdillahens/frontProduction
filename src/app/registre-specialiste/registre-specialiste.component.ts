import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AbstractControl, FormBuilder, FormControl, FormControlDirective, FormGroup, RequiredValidator, ValidatorFn, Validators } from '@angular/forms';
declare var FB : any;
declare var $ :any;

@Component({
  selector: 'app-registre-specialiste',
  templateUrl: './registre-specialiste.component.html',
  styleUrls: ['./registre-specialiste.component.css']
})
export class RegistreSpecialisteComponent implements OnInit {

  public TELE : String='';
  constructor(private _auth: AuthService, private _router: Router, private formBuilder: FormBuilder) { }
  public message: String = '';
  public confirm = false;
  registerForm: FormGroup = new FormGroup({});
  submitted = false;
  private fileDeplome: File = new File(["foo"], "foo.txt");
  private fileCV: File = new File(["foo"], "foo.txt");

  name: FormControl = new FormControl('value', Validators.minLength(2));

  selectDeplome(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files?.length) {
      return;
    }

    this.fileDeplome = input.files[0];
    console.log(this.fileDeplome);
  }
  selectCV(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files?.length) {
      return;
    }

    this.fileCV = input.files[0];
    console.log(this.fileCV);
  }
  public changeTele(){
    console.log("hi focus")
    //if(this.TELE.length===2) this.TELE+='-';
    if(this.TELE.length===0)this.TELE = '()-';
  }

  private FileSizeValidator(min: number, max: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
   
        if (control.value.size < min || control.value.size > max){
            return { 'fileSize': true };
        }
        return null;
    };
}



  public registreSubmit() {
    // console.log(this.nom,this.prenom,this.sexe,this.date_naissance,this.email,this.tele,this.profession,this.password)
    this.submitted = true;
    const { nom, prenom, sexe, date_naissance, email, tele, specialite, password } = this.registerForm.value;
    if (this.registerForm.invalid) {
      return;
    }
    const formDataDeplome = new FormData();
    formDataDeplome.append('file', this.fileDeplome);
    console.log(formDataDeplome);
    const formDataCV = new FormData();
    formDataCV.append('file', this.fileCV);
    console.log(formDataCV);
    var id : number = 0;
 
    this._auth.registreSpecialiste(nom, prenom, sexe, date_naissance, email, tele, specialite, password).subscribe(
      
      res => {
        id = res.id;
        // console.log("this is id "+id)
        this._auth.uploadFileDeplome(id,formDataDeplome).subscribe(
          res => {
            console.log('upload success');
          },
          err => console.log(err)
        )
          this._auth.uploadFileCV(id,formDataCV).subscribe(
            res => {
              console.log('upload success');
            },
            err => console.log(err)
          )
        console.log(res.message);
        $('#exampleModalCenter').modal('show');
        // this.message = res.message;
        // this.confirm = true;
      },
      err => console.log(err)
    )
    $('#exampleModalCenter').on('hidden.bs.modal',  () => {
      this._router.navigate(['/acceuil'])
     });
  }

  get f() {
    // console.log(this.registerForm.controls.CV.errors)
    return this.registerForm.controls; }

    private mutch(): ValidatorFn {  
      return (control: AbstractControl): { [key: string]: any } | null =>  
          control.value === this.registerForm.value.password
              ? null : {mutchPass: control.value};
    }

  ngOnInit(): void {

    this.registerForm = this.formBuilder.group({
      nom: ['', Validators.required], 
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      tele: ['', [Validators.required,Validators.pattern("^((\\([0-9][0-9][0-9]\\))|(\\([0-9][0-9]\\)))?\\-[0-9]{10}$")]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['', [Validators.required, Validators.minLength(6),this.mutch()]],
      sexe: ['', [Validators.required]],
      date_naissance: ['', [Validators.required]],
      specialite: ['', [Validators.required,]],
      deplome: ['', [Validators.required,this.FileSizeValidator(9,1)]],
      CV: ['', [Validators.required,this.FileSizeValidator(9,1)]]

    });

  }


}
