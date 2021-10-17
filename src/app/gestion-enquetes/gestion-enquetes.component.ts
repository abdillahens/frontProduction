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
