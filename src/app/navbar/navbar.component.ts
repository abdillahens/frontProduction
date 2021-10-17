import { HttpErrorResponse } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
declare var $ :any;
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

 public isLogged : boolean = true;
 public home : String = '/login';
 private role : String="";

  constructor(private _router : Router,private _auth : AuthService) {
  }
  public navigate(){
    window.scrollTo(0, document.getElementById('apropos')!.offsetTop-100);
  }
  public navigateContact(){
    window.scrollTo(0, document.getElementById('contact')!.offsetTop-100);
  }
  public navigateEquipe(){
    window.scrollTo(0, document.getElementById('equipe')!.offsetTop-0);
  }

  public signUp(){
    $('#elegantModalFormRegistre').modal('show');
  }
  public signIn(){
    $('#elegantModalForm').modal('show');
  }
  public profile(){
    switch(this.role){
      case 'client' :    this._router.navigate(['/home']); break;
      case 'specialiste' :    this._router.navigate(['/specialiste/home']);
       break;
       case 'admin':this._router.navigate(['/admin']);break;
    }
  }
  public log_out(){

    localStorage.removeItem('authorization');
    this._router.navigate(['/acceuil']);
    this.ngOnInit();
    // this.isLogged = false;

  }

  public log_in(){
    this._router.navigate(['/login']);
  }

  public registring(){

    this._router.navigate(['/registre/client']);

  }

  async ngOnInit(): Promise<void> {

    (await this._auth.getInformation()).subscribe(
      res => {
        this.role = res.role;
      },
      err => {
        if(err instanceof HttpErrorResponse){
           console.log(err)
        }})


    this.isLogged =  !!localStorage.getItem('authorization');
    if(this.isLogged){
      this.home='/home';
    }
    else{
      this.home='/login';
    }

  }

}
