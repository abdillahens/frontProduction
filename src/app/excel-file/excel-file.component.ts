import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { GestionClientService } from '../gestion-client.service';
declare var $ :any;
@Component({
  selector: 'app-excel-file',
  templateUrl: './excel-file.component.html',
  styleUrls: ['./excel-file.component.css']
})
export class ExcelFileComponent implements OnInit {

  public profile = "../assets/img/contact.png";
  public user = {date_naissance : '',email: '',id: 0,nom: '',numero_tele: '',prenom: '',profession: '',adresse: '',role: '',picture: ''};
  public static clients : Array<any> = [];
  public excel: any;
  constructor(private _Client : GestionClientService,private _router : Router,private _auth :AuthService) { }
  private image: File = new File(["foo"], "foo.txt");
  public charged = true;

  selectImg(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) {
      return;
    }
    this.image = input.files[0];
    this.charged = false;
    console.log(this.image);
  }

  selectExcel(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) {
      return;
    }
    this.excel = input.files[0];
    this.charged = false;
    console.log(this.excel);
  }
  
  public sendExcel(){
    const formDataProfile = new FormData();
    formDataProfile.append('file', this.excel);

    this._Client.uploadExcel(formDataProfile).subscribe(
      res=>{console.log(res.message)},
      err=>{}
    )

  }

  public changePhoto(){

    console.log("click")
    const formDataProfile = new FormData();
    formDataProfile.append('file', this.image);
    this._auth.uploadProfile(this.user.id,formDataProfile).subscribe(
      
      res=>{
        // console.log("hhhhhhh")
        console.log(res.src);
        (document.getElementById('myImage3') as HTMLFormElement).src = res.src;
        this._router.navigate(['/admin'])
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
  public getUser(){
    return this.user;
  }



 
  ngOnInit(): void {


      this._auth.getInformation().subscribe(
         res => {
          console.log(res);
          this.user = res;
        },
        err => {
          if(err instanceof HttpErrorResponse){
             console.log(err)
          }
        }
      )  
  }

}
