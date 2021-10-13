import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { GestionSpecialisteServiceService } from '../gestion-specialiste-service.service';
declare var $ :any;
@Component({
  selector: 'app-gestion-enquetes',
  templateUrl: './gestion-enquetes.component.html',
  styleUrls: ['./gestion-enquetes.component.css']
})
export class GestionEnquetesComponent implements OnInit {

  constructor(private _auth : AuthService,private _gestionSpecialiste : GestionSpecialisteServiceService, private _router: Router, private formBuilder: FormBuilder) { }

  public user = {date_naissance: '',id : 0,email: '',nom: '',numero_tele: '',sexe:'',prenom: '',specialite: '',adresse: '',role: '',picture:'',};

  private image: File = new File(["foo"], "foo.txt");
  public charged = true;
  public profile = "../assets/img/contact.png";

  selectImg(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) {
      return;
    }
    this.image = input.files[0];
    this.charged = false;
    console.log(this.image);
  }
  
  public changePhoto(){

    console.log("click")
    const formDataProfile = new FormData();
    formDataProfile.append('file', this.image);
    this._auth.uploadProfileSpecialiste(this.user.id,formDataProfile).subscribe(
      
      res=>{
        (document.getElementById('myImage3') as HTMLFormElement).src = res.src;
        $('#addPhoto').modal('hide');
        this._router.navigate(['/specialiste/home'])
      },err=>{console.log(err)}
      );
    

  }

  public editPhoto(){
    $('#exampleModalCenter').modal('show');
  }
  public addPhoto(){
    $('#exampleModalCenter').modal('hide');
    $('#addPhoto').modal('show');
  }
  public specialistesValue(){
    return this.user;
  }

  ngOnInit(): void {
    this._auth.getInformation().subscribe(

      res => {
        this.user = res;
      },
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          console.log(err);
        }
      })
  }

}
