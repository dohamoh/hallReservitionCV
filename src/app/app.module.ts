import {  HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { BookingComponent } from './components/booking/booking.component';
import { GalaryComponent } from './components/galary/galary.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HallDetailsComponent } from './components/hall-details/hall-details.component';
import { ReservationsComponent } from './components/reservations/reservations.component';
import { SliderHolderComponent } from './components/slider-holder/slider-holder.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDeletionComponent } from './components/confirm-deletion/confirm-deletion.component';
import { EditHallComponent } from './components/edit-hall/edit-hall.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    FooterComponent,
    BookingComponent,
    GalaryComponent,
    UserProfileComponent,
    SignUpComponent,
    HallDetailsComponent,
    ReservationsComponent,
    SliderHolderComponent,
    ConfirmDeletionComponent,
    EditHallComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CarouselModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
