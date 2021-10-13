import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GestionSpecialisteServiceService {

  private _selectUrl = 'http://80.240.28.95/backend/select/specialiste'
  private _deleteSpecialisteUrl = 'http://80.240.28.95/backend/delete/specialiste'
  private _updateSpecialisteUrl = 'http://80.240.28.95/backend/update/specialiste'
  private _getDeplome = 'http://80.240.28.95/backend/client/deplome';
  private _getCv = 'http://80.240.28.95/backend/download';
  constructor(private http : HttpClient,private _router : Router) { }


  public getSpecialistes(){
    return this.http.get<any>(this._selectUrl);
  }
  public getDeplome(id:number){
    return this.http.get<any>(this._getCv, {
      observe: 'response',
      responseType: 'application/pdf' as 'json'
    });
  }
  public getCv(id:number){

  }

  public deleteSpecialiste(id : number){
    return this.http.post<any>(this._deleteSpecialisteUrl,{id});
  }

  public updateSpecialiste(id : number,nom : String,prenom :String,sexe : String,date_naissance : Date,email : String,tele : String,specialite : String,adresse:String,password : String){

    return this.http.post<any>(this._updateSpecialisteUrl,{id,nom,prenom,sexe,date_naissance,email,tele,specialite,adresse,password});

  }
  public updateSpecialiste2(id : number,nom : String,prenom :String,sexe : String,date_naissance : Date,email : String,tele : String,specialite : String,adresse: String){

    return this.http.post<any>(this._updateSpecialisteUrl,{id,nom,prenom,sexe,date_naissance,email,tele,specialite,adresse});

  }
}
