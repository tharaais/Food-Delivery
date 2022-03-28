import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfilesService } from 'src/app/new-services/profiles.service';
import { UserLoginService } from 'src/app/new-services/user-login.service';
import { Profiles } from 'src/app/shared/NewClasses';

interface FRMERR {
  [ key: string ] : any;
}

interface VLDMSSG {
  [ key : string ] : any;
}


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public signupForm: FormGroup;
  private myUser: Profiles = new Profiles();

  public sections: string[] = [
    "Technical Radio", "Technical Rollout", "Technical RAN", "Technical Core", "Technical Fiber",
    "Technical NSD", "Technical SO", "Technical MW", "Technical Security Systems",
    "Marketing", "HCM", "Call Center", "MIS Development", "MIS Testing", "MIS Configuration and Release Management",
    "MIS UNIX Systems Administration", "MIS UI/UX Design"
  ];

  formErrors: FRMERR = {
    'firstname': '',
    'lastname': '',
    'email': '',
    'password': '',
    'passwordConfirm': '',
    'phone': ''
  };

  validationMessages: VLDMSSG = {
    'email': {
      'required':      'Email is Required !',
      'email':         'Email Address is not in valid format !'
    },
    'password': {
      'required':      'Password is Required !',
      'pattern':        'Password must be 8~12 char length with min one Upper and one Lower and one symbol and one number'
    },
    'passwordConfirm': {
      'required':      'You must retype your password to confirm !',
      'confirm':        'Two Passwords Must Match !'
    },
    'firstname': {
      'required':      'First Name is Required !'
    },
    'lastname': {
      'required':      'Last Name is Required !'
    },
    'phone': {
      'required':      'Phone Number is Required !',
      'pattern':       'Phone Number must be Numeric !'
    },
  };

  constructor(private fb: FormBuilder,
              private router: Router,
              private profilesService: ProfilesService,
              private userLoginService: UserLoginService) {

    this.signupForm = this.fb.group({
      firstname: ["", Validators.required],
      lastname: ["", Validators.required],
      password: ["", [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,20}$")]],
      passwordConfirm: ["", Validators.required],
      email: ["",[Validators.required, Validators.email]],
      phone: ["", [Validators.required,Validators.pattern("^\\d+$")]],
      section: [""]
    });
  }

  ngOnInit(): void {

    this.createForm();

  }



  onValueChanged(data?: any) {
    if (!this.signupForm) { return; }
    const form = this.signupForm;
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
      this.signupForm.valueChanges
        .subscribe((data) => {this.onValueChanged(data)});

      this.onValueChanged(); // (re)set validation messages now

    }


    confirmCheck(event: any) {
      // console.log(event.target.value);
      if ((event.target.value) != (this.signupForm.get("password")?.value)) {

        this.formErrors["passswordConfirm"] = 'Two Passwords Must Match !';
        return;

      } else {
        this.formErrors["passswordConfirm"] = "";
        return;
      }
    }


  onSubmit() {

    this.myUser.Email = this.signupForm.get("email")?.value;
    this.myUser.FirstName = this.signupForm.get("firstname")?.value;
    this.myUser.LastName = this.signupForm.get("lastname")?.value;
    this.myUser.Mobile = this.signupForm.get("phone")?.value;
    this.myUser.Password = this.signupForm.get("password")?.value;
    this.myUser.Section = this.signupForm.get("section")?.value;

    this.userLoginService.RegisterMe(this.myUser)
      .then(() => {
        this.profilesService.saveProfile(this.myUser).subscribe(() => {
          this.router.navigate(["/profile"]);
        });
      });

  }

}
