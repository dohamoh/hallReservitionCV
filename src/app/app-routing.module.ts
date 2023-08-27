import { ConnectUsComponent } from './components/connect-us/connect-us.component';
import { LogoutGuard } from './services/logout.guard';
import { LoginGuard } from './services/login.guard';
import { BookingComponent } from './components/booking/booking.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GalaryComponent } from './components/galary/galary.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AddHallComponent } from './components/add-hall/add-hall.component';


const routes: Routes = [
  {path:'',redirectTo:"home",pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {path:'booking',canActivate:[LoginGuard],component:BookingComponent},
  {path:'gallery',component:GalaryComponent},
  {path:'addHall',component:AddHallComponent},
  {path:'register',canActivate:[LogoutGuard],component:SignUpComponent},
  {path:'userProfile',canActivate:[LoginGuard],component:UserProfileComponent},
];

@NgModule({
  // imports: [RouterModule.forRoot(routes,{useHash:true}),
  imports: [RouterModule.forRoot(routes)],  
  exports: [RouterModule]

})
export class AppRoutingModule { }
