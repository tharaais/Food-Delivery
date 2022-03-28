import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Profiles } from 'src/app/shared/NewClasses';
import { UserLoginService } from 'src/app/new-services/user-login.service';



interface FRMERR {
  [ key: string ] : any;
}

interface VLDMSSG {
  [ key : string ] : any;
}

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  public myProfiles: Profiles[] = [];
  public myProfile: Profiles = new Profiles();
  public errorMsgUsers: string = "";
  public errorMsgUser: string = "";

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


  constructor(private userLoginService: UserLoginService,
              private fb: FormBuilder,
              private router: Router) {

    this.loginForm = this.fb.group({
      email: [localStorage.getItem("localMail"),[Validators.required,Validators.email]],
      password: [localStorage.getItem("localPass"), [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,20}$")]],
      remember: [localStorage.getItem("remember")]
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
        .subscribe((data) => {
          this.onValueChanged(data);
        });

      this.onValueChanged(); // (re)set validation messages now

    }

    onSubmit() {
      if(this.loginForm.controls["remember"].value === "true") {
        localStorage.setItem("localMail",`${this.loginForm.controls["email"].value}`);
        localStorage.setItem("localPass",`${this.loginForm.controls["password"].value}`);
        localStorage.setItem("remember","true");
      } else {
        localStorage.removeItem("localMail");
        localStorage.removeItem("localPass");
      }
      this.myProfile.Email = this.loginForm.get("email")?.value;
      this.myProfile.Password = this.loginForm.get("password")?.value;
      this.userLoginService.LogMeIn(this.myProfile)
      .then(() => {this.router.navigate(["/profile"]);},
            (error) => {this.errorMsgUser = error;});
  }

}
