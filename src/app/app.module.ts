import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomeComponent } from './components/home/home.component';
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
import { ConnectUsComponent } from './components/connect-us/connect-us.component';
import { AddHallComponent } from './components/add-hall/add-hall.component';
import { UnapprovedComponent } from './components/unapproved/unapproved.component';
import { OnHoldComponent } from './components/on-hold/on-hold.component';
import { NoDataComponent } from './components/no-data/no-data.component';
import { LoadingComponent } from './components/loading/loading.component';
import { DashComponent } from './components/dash/dash.component';
import { ChartsModule } from 'ng2-charts';
import { FooterComponent } from './components/footer/footer.component';
import { BookingComponent } from './components/booking/booking.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

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
    OnHoldComponent,
    UnapprovedComponent,
    SliderHolderComponent,
    ConfirmDeletionComponent,
    EditHallComponent,
    AddHallComponent,
    ConnectUsComponent,
    NoDataComponent,
    LoadingComponent,
    DashComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CarouselModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    NgMultiSelectDropDownModule.forRoot(),

    ChartsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      defaultLanguage: 'En'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
