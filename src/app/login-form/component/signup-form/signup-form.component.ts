import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from "@angular/core";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {PasswordValidator} from "./validator";
import {ErrorText, Signup} from "../../../models/login-signup.model";
import {AuthService} from "../../../services/auth-service";
import {URLS} from "../../../urls";

@Component({
  selector: "mm-signup-form",
  templateUrl: "./signup-form.component.html",
  styleUrls: ["./signup-form.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupFormComponent {

  renderComponent = false;
  formHeading = 'Signup to MM!'
  showPassword = false;
  signUpForm: FormGroup;
  step = 1;
  formData: Signup | undefined;
  errorText: ErrorText = {}

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private authService: AuthService
  ) {
    this.signUpForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', PasswordValidator.validate],
      confirmPassword: ['']
    });
  }

  ngOnInit() {
    this.renderComponent = true;
    this.cdr.markForCheck();
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
    this.cdr.markForCheck();
  }

  closeForm() {
    this.signUpForm.reset();
    this.router.navigate([URLS.HOME])
  }

  onNextClick() {
    if (this.checkForNameEmailValidation(true)) return;
    this.step = 2;
    this.cdr.markForCheck();
  }

  checkForNameEmailValidation(forNextBtn = false, checkFor = 'email'): boolean | undefined {
    if (forNextBtn) {
      return this.signUpForm.get('name')?.hasError('required') ||
        this.signUpForm.get('email')?.hasError('required') ||
        this.signUpForm.get('email')?.hasError('email')
    }
    if (checkFor === 'email') {
      if (this.signUpForm.get('email')?.hasError('required')) {
        this.errorText.email = 'Email is required'
      } else if (this.signUpForm.get('email')?.hasError('email')) {
        this.errorText.email = 'Invalid email!'
      }
      return this.signUpForm.get('email')?.touched &&
        (this.signUpForm.get('email')?.hasError('required') ||
          this.signUpForm.get('email')?.hasError('email'))
    }
    if (checkFor === 'name') {
      this.errorText.name = 'Name is required!'
      return this.signUpForm.get('name')?.touched &&
        (this.signUpForm.get('name')?.hasError('required'))
    }
    return false;

  }

  checkForPasswordValidation(checkConfirmPass = false, checkForSubmitBtn = false): undefined | boolean {


    const passControl: AbstractControl | null = this.signUpForm.get('password')
    const confirmPassControl: AbstractControl | null = this.signUpForm.get('confirmPassword')
    if (checkForSubmitBtn) {
      return !this.signUpForm.valid || passControl?.value !== confirmPassControl?.value
    }
    if (checkConfirmPass) {
      if (confirmPassControl?.touched) {
        if (passControl?.value === confirmPassControl?.value) {
          return false;
        } else {
          this.errorText.confirmPassword = 'Passwords does not match!'
          return true;
        }
      }
      return false;
    }
    if (passControl?.touched) {
      if (passControl?.hasError('required')) {
        this.errorText.password = 'Password is required!'
        return true;
      }
      if (passControl?.hasError('shortPassword')) {
        this.errorText.password = 'Password must be 5 characters long!'
        return true;
      }
      if (passControl?.hasError('noNumber')) {
        this.errorText.password = 'Password must include a number!'
        return true;
      }
    }
    return false;
  }

  onSubmit() {
    if(this.signUpForm.valid){
    const {name, email, pass} = this.signUpForm.value

    const confirmationPass = this.signUpForm.get('confirmPassword')?.value;
    if (pass !== confirmationPass) {
      //TODO :: Implement notification service
      // return;
    }
    if (name && email && pass) {

      console.warn(name)
      console.warn(email)
      console.warn(pass)
      this.authService.signupUser({
        name, email, password: pass
      }).subscribe(res => {
        console.warn(res);
        if (res.isSuccessful()) {
          const data = res.body?.data;
          if (data) {
            console.warn(res.body.data)
            console.warn(res.body);
            if (data.created) {
              // Notification Service
              this.router.navigate([URLS.AUTH.LOGIN.split('/')])
            } else if (!data.created && data.already_exists) {
              //Notifiy user
            } else {

            }
          }
        }
      })
    }
    }else{
      //TODO :: Implement notification service
    }
  }
}
