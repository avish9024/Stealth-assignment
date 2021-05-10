import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularResizedEventModule } from 'angular-resize-event';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SharedModule} from './shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import {FormsModule} from '@angular/forms';
import {ClickOutsideDirective} from './shared/directives/click-outside.directive';
import {HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { SignInComponent } from './sign-in/sign-in.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ClickOutsideDirective,
    LoginComponent,
    SignInComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    PickerModule,
    AngularResizedEventModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
