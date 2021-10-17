import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { AdminClientSideComponent } from './admin-client-side/admin-client-side.component';
import { AdminSpecialisteSideComponent } from './admin-specialiste-side/admin-specialiste-side.component';
import { AdminComponent } from './admin/admin.component';
import { AnexityComponent } from './anexity/anexity.component';
import { AuthAdminGuardGuard } from './auth-admin-guard.guard';
import { AuthClientGuardGuard } from './auth-client-guard.guard';
import { AuthSpecialisteGuardGuard } from './auth-specialiste-guard.guard';
import { AuthGuard } from './auth.guard';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { DepressionComponent } from './depression/depression.component';
import { ErrorInRoutingComponent } from './error-in-routing/error-in-routing.component';
import { ExcelFileComponent } from './excel-file/excel-file.component';
import { GestionEnquetesComponent } from './gestion-enquetes/gestion-enquetes.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { RegistreSpecialisteComponent } from './registre-specialiste/registre-specialiste.component';
import { SpacialisteHomeComponent } from './spacialiste-home/spacialiste-home.component';
import { StressComponent } from './stress/stress.component';



const routes: Routes = [

{
  
path : '',
redirectTo : '/acceuil',
pathMatch : 'full'

},

{
  path : 'specialiste/gestion/Enquetes',
  component : GestionEnquetesComponent,
  canActivate : [AuthSpecialisteGuardGuard]
},
{
  path : 'profile',
  component : ProfileComponent
},
{
  path : 'denied',
  component : AccessDeniedComponent

},
{
  path : 'acceuil',
  component : AcceuilComponent
},
{
  path : 'acceuil/:id',
  component : ConfirmationComponent
},
{
  path : 'specialiste/home',
  component : SpacialisteHomeComponent,
  canActivate : [AuthSpecialisteGuardGuard]

},

{

  path : 'registre/specialiste',
  component : RegistreSpecialisteComponent

},

{
  path : 'client/test/anexity',
  component : AnexityComponent,
  canActivate : [AuthClientGuardGuard ]
},
{
  path : 'client/test/stress',
  component : StressComponent,
  canActivate : [AuthClientGuardGuard ]
},
{
  path : 'client/test/depression',
  component : DepressionComponent,
  canActivate : [AuthClientGuardGuard ]
},

{
path : 'home',
component : HomeComponent,
canActivate : [AuthClientGuardGuard],}
,
{
   path : 'admin',
   component : AdminComponent ,
   canActivate : [AuthAdminGuardGuard ],

},
{ 
  path : 'admin/client-side',
  component : AdminClientSideComponent ,
  canActivate : [AuthAdminGuardGuard ]
}
,
{ 
  path : 'admin/excelFile',
  component : ExcelFileComponent,
  canActivate : [AuthAdminGuardGuard ]
}
,

{
  path : 'admin/specialiste-side/add',
  component : RegistreSpecialisteComponent ,
  canActivate : [AuthAdminGuardGuard ],

},

{
  
  path : 'admin/specialiste-side',
  component : AdminSpecialisteSideComponent,
  canActivate : [AuthAdminGuardGuard ]
},
{
  
  path : 'admin/gestion-enquetes',
  component : GestionEnquetesComponent,
  canActivate : [AuthAdminGuardGuard ]
},

{
  path : '**',
  component : ErrorInRoutingComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
