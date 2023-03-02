//  This code is written in TypeScript, an open-source language developed by Microsoft. 
//  It is a superset of JavaScript and can be used to develop applications for web, mobile, and desktop.
//  The code imports several components and services that are used in the application.

//  The @angular/core package is imported and provides a basic set of components and services for managing Angular applications. 
//  A FormBuilder, FormGroup, and Validators from the @angular/forms package are also imported and are used for creating forms.
//  The MatDialogRef from the @angular/material/dialog package is imported and is used for managing dialogs (which appear as popups on the screen). 
//  The NgxUiLoaderService from the ngx-ui-loader package is imported and is used to show loading animations while some processes are running in the background. 
//  The UserService and SnackbarService classes and functions are imported from the custom services package. 
//  Additionally, a GlobalConstants class is imported from the shared package.

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../services/snackbar.service';
import { UserService } from '../services/user.service';
import { GlobalConstants } from '../shared/global-contants';

// An Angular component is declared with the @Component decorator, which specifies the selector and template URIs of the component. 
// The SignupComponent class implements the OnInit interface and its ngOnInit() method is called whenever the component is loaded.

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

// The password and confirmPassword variables are declared, along with a FormGroup called signupForm. 
// This FormGroup contains various properties, each with an associated validator. 

export class SignupComponent implements OnInit {
  password = true;
  confirmPassword = true;
  signupForm:any = FormGroup;
  responseMessage:any;


  constructor(private formBuilder:FormBuilder,
    private router:Router,
    private userService:UserService,
    private snackbarService:SnackbarService,
    public dialogRef:MatDialogRef<SignupComponent>,
    private ngxService:NgxUiLoaderService
  ) { }

// ngOnInit is part of the angular lifecycle hook that is called after a component 
// creates its self and before it renders on the page. 

ngOnInit(): void {

  // Create a signupForm using the formBuilder class, which is imported
  // from @angular/forms

  this.signupForm = this.formBuilder.group({

    // Set the name field to accept null values, but also require
    // them to pass the regex stored in GlobalConstants

    name:[null,[Validators.required,Validators.pattern(GlobalConstants.nameRegex)]],

    // Set the email field to accept null values, but also require
    // them to pass the regex stored in GlobalConstants

    email:[null,[Validators.required,Validators.pattern(GlobalConstants.emailRegex)]],

    // Set the contactNumber field to accept null values, but also require
    // them to pass the regex stored in GlobalConstants

    contactNumber:[null,[Validators.required,Validators.pattern(GlobalConstants.contactNumberRegex)]],

    // Set the password field to accept null values, but also require
    // them to pass the required validator

    password:[null,[Validators.required]],

    // Set the confirmPassword field to accept null values, but also require
    // them to pass the required validator
    
    confirmPassword:[null,[Validators.required]]
  })
}

  // The vaildateSubmit() function is used to check that the user's entered password and confirmation password match.

  vaildateSubmit(){
    if(this.signupForm.controls['password'].value != this.signupForm.controls['confirmPassword'].value){
      return true;
    } else {
      return false;
    }
  }

  // The handleSubmit() function is used to send the user's sign-up information to the server. 
  // If successful, the dialog is closed, the user is shown a message indicating success, 
  // and they are routed to the main page of the application. If an error occurs, the user is shown an appropriate error message.

  handleSubmit(){
    this.ngxService.start();
    var formData = this.signupForm.value;
    var data = {
      name: formData.name,
      email: formData.email,
      contactNumber: formData.contactNumber,
      password: formData.password
    }
    this.userService.signup(data).subscribe((response:any)=>{
      this.ngxService.stop();
      this.dialogRef.close();
      this.responseMessage = response?.message;
      this.snackbarService.openSnackBar(this.responseMessage,"");
      this.router.navigate(['/']);
    },(error)=>{
      this.ngxService.stop();
      if(error.error?.message){
        this.responseMessage = error.error?.message
      } else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    })
  }

}
