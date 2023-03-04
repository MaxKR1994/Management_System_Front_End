// First, the code is importing various modules from the @angular/core and @angular/platform-browser libraries. 
// These modules provide APIs and other functionalities for use in the application.

// The AppRoutingModule helps define the different routes that will be available 
// in the application (for example, different pages or views that are available to the user).

// The AppComponent, HomeComponent, BestSellerComponent, FullComponent, AppHeaderComponent, AppSidebarComponent, 
// and SignupComponent are all components that have been created as classes and are used in the application.

// The FormsModule and ReactiveFormsModule help provide form validations 
// and other features related to interacting with forms.

// The MaterialModule allows access to any material design components made available by Angular.

// The FlexLayoutModule helps with creating responsive layouts, 
// allowing for the UI to better adapt to different devices or screen resolutions.

// The SharedModule provides a way to share common components throughout the Angular application.

// The HttpClientModule provides a way to communicate with a server 
// from within an Angular application (such as making HTTP requests).

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material-module';
import { HomeComponent } from './home/home.component';
import { BestSellerComponent } from './best-seller/best-seller.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from './shared/shared.module';
import { FullComponent } from './layouts/full/full.component';
import { AppHeaderComponent } from './layouts/full/header/header.component';
import { AppSidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './signup/signup.component';
import { NgxUiLoaderConfig, NgxUiLoaderModule, SPINNER } from 'ngx-ui-loader';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';

// The NgxUiLoaderModule is a module for loading animations. 
// The configuration options set in the ngxUiLoaderConfig object were used to configure the appearance 
// and functionality of such animations.

const ngxUiLoaderConfig: NgxUiLoaderConfig ={
  text:"Loading...",
  textColor: "#FFFFFF",
  textPosition:"center-center",
  bgsColor:"#7b1fa2",
  fgsColor:"#7b1fa2",
  fgsType:SPINNER.squareJellyBox,
  fgsSize:100,
  hasProgressBar:false
}

// Finally, the code declares a @NgModule decorator, which is used to create a module, 
// specifying which components, services, etc. can be used in that module. 
// This module is then bootstrapped via the AppComponent, which is the root component of the application.

@NgModule({
  declarations: [	
    AppComponent,
    HomeComponent,
    BestSellerComponent,
    FullComponent,
    AppHeaderComponent,
    AppSidebarComponent,
    SignupComponent,
    ForgotPasswordComponent,
    LoginComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    SharedModule,
    HttpClientModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
