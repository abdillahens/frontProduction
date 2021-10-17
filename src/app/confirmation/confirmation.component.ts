import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})

export class ConfirmationComponent implements OnInit {

  private id : any = this.route.snapshot.paramMap.get('id');

  constructor(private route : ActivatedRoute,private _auth : AuthService ,private _router : Router) { }

  ngOnInit(): void {

    this._auth.ConfirmAuth(this.id).subscribe(

      res=> {

        localStorage.removeItem('authorization');
        localStorage.setItem('authorization', res.accessToken);
        // this._router.navigate(['/acceuil']);
        switch(res.role){
          case 'client' :  this._router.navigate(['/home']);break;
          case 'specialiste' :  this._router.navigate(['/specialiste/home']);break;
        }
        
      },
      
      err=>{
        console.log(err);
        this._router.navigate(['/acceuil']);
      })

  }
  }


