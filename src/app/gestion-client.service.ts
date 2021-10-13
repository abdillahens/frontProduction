import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class GestionClientService {
  private _selectUrl = 'http://80.240.28.95/backend/select'
  private _deleteClientUrl = 'http://80.240.28.95/backend/delete/client'
  private _updateClientUrl = 'http://80.240.28.95/backend/update/client'
  private _getDeplome = 'http://80.240.28.95/backend/client/deplome';
  private _getCv = 'http://80.240.28.95/backend/download';

  constructor(private http : HttpClient,private _router : Router) { }

  public uploadExcel(myFile : FormData){
    return this.http.post<any>('http://80.240.28.95/backend/upload/excel/data',myFile);
  }

  public getClients(){
    return this.http.get<any>(this._selectUrl);
  }

  public deleteClient(id : number){
    return this.http.post<any>(this._deleteClientUrl,{id});
  }
  public updateClient2(id : number, nom : String,prenom :String,sexe : String,date_naissance : Date,email : String,tele : String,profession : String,niveauScolaire:String,adresse: String){
    return this.http.post<any>(this._updateClientUrl,{id,nom,prenom,sexe,date_naissance,email,tele,niveauScolaire,profession,adresse});
  }

  public updateClient(id : number, nom : String,prenom :String,sexe : String,date_naissance : Date,email : String,tele : String,profession : String, adresse:String,niveauScolaire:String,password : String){

    return this.http.post<any>(this._updateClientUrl,{id,nom,prenom,sexe,date_naissance,email,tele,profession,adresse,niveauScolaire,password});

  }

}
