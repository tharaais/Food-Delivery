import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Profiles } from 'src/app/shared/NewClasses';
import { AdminLoginService } from '../../services/admin-login.service';

interface FRMERR {
  [ key: string ] : any;
}

interface VLDMSSG {
  [ key : string ] : any;
}

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  public myProfiles: Profiles[] = [];
  public myProfile: Profiles = new Profiles();
  public errorMsgAdmin: string = "";

  public loginForm: FormGroup;

  formErrors: FRMERR = {
    'email': '',
    'password': ''
  };

  validationMessages: VLDMSSG = {
    'email': {
      'required':      'Email is required !',
      'email':         'Email Address is not in valid format !'
    },
    'password': {
      'required':      'Password is required !',
      'pattern':       'Password must be 8~12 char length with min one Upper and one Lower and one symbol and one number'
    }
  };


  constructor(private adminLoginService: AdminLoginService,
              private fb: FormBuilder,
              private router: Router) {

    this.loginForm = this.fb.group({
      email: ["",[Validators.required,Validators.email]],
      password: ["",[Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,20}$")]]
    });

   }

  ngOnInit(): void {

    this.createForm();

  }

  onValueChanged(data?: any) {
    if (!this.loginForm) { return; }
    const form = this.loginForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

   createForm(): void {
      this.loginForm.valueChanges
        .subscribe((data) => {this.onValueChanged(data)});

      this.onValueChanged(); // (re)set validation messages now

    }


    onSubmit() {
      this.myProfile.Email = this.loginForm.get("email")?.value;
      this.myProfile.Password = this.loginForm.get("password")?.value;
      this.adminLoginService.LogMeIn(this.myProfile)
      .then(() => {this.router.navigate(["/dashboard"]);},
            (error) => {this.errorMsgAdmin = error;});
  }


}
