import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from "@angular/core";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {PasswordValidator} from "./validator";
import {ErrorText, Signup} from "../../../models/login-signup.model";

@Component({
  selector: "mm-signup-form",
  templateUrl: "./signup-form.component.html",
  styleUrls: ["./signup-form.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupFormComponent {

  isLoginForm=true;
  renderComponent = false;
  formHeading='Signup to MM!'
  showPassword = false;
  signUpForm:FormGroup;
  step  = 1;
  formData:Signup | undefined;
  errorText:ErrorText = {}

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route:ActivatedRoute,
    private cdr:ChangeDetectorRef
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

  toggleShowPassword(){
    this.showPassword = !this.showPassword;
    this.cdr.markForCheck();
  }

  onFormSwitchClick(){
    if(this.isLoginForm) this.router.navigate(['auth','user_signup'])
    else this.router.navigate(['auth','user_login'])
  }

  setFormHeading(){
    if(!this.isLoginForm) {
      this.formHeading = 'Sign Up to MM!'
      this.cdr.markForCheck();
    }
  }

  closeForm(){
    this.signUpForm.reset();
    this.router.navigate(['/'])
  }

  onNextClick(){
    if(this.checkForNameEmailValidation(true)) return;
    this.step = 2;
    this.cdr.markForCheck();
  }

  checkForNameEmailValidation(forNextBtn = false, checkFor = 'email'):boolean | undefined{
    if(forNextBtn){
      return this.signUpForm.get('name')?.hasError('required') ||
        this.signUpForm.get('email')?.hasError('required') ||
        this.signUpForm.get('email')?.hasError('email')
    }
    if(checkFor === 'email'){
      if(this.signUpForm.get('email')?.hasError('required')){
        this.errorText.email = 'Email is required'
      }else if (this.signUpForm.get('email')?.hasError('email')){
        this.errorText.email = 'Invalid email!'
      }
      return this.signUpForm.get('email')?.touched &&
      (this.signUpForm.get('email')?.hasError('required') ||
        this.signUpForm.get('email')?.hasError('email'))
    }
    if(checkFor === 'name'){
      this.errorText.name = 'Name is required!'
      return this.signUpForm.get('name')?.touched &&
      (this.signUpForm.get('name')?.hasError('required'))
    }
    return false;

  }

  checkForPasswordValidation(checkConfirmPass=false,checkForSubmitBtn = false):undefined | boolean{


    const passControl:AbstractControl | null = this.signUpForm.get('password')
    const confirmPassControl:AbstractControl | null = this.signUpForm.get('confirmPassword')
    if(checkForSubmitBtn){
      // return passControl?.hasError('required') || passControl?.hasError('shortPassword') ||
      //   passControl?.hasError('noNumber') || confirmPassControl?.hasError('required') ||
        return !this.signUpForm.valid || passControl?.value !==confirmPassControl?.value
    }
    if(checkConfirmPass){
      if(confirmPassControl?.touched){
        if(passControl?.value === confirmPassControl?.value){
          return false;
        }else{
          this.errorText.confirmPassword = 'Passwords does not match!'
          return true;
        }
      }
      return false;
    }
    if(passControl?.touched){
      if(passControl?.hasError('required')){
        this.errorText.password = 'Password is required!'
        return true;
      }
      if (passControl?.hasError('shortPassword')){
        this.errorText.password = 'Password must be 5 characters long!'
        return true;
      }
      if(passControl?.hasError('noNumber')){
        this.errorText.password = 'Password must include a number!'
        return true;
      }
    }
    return false;
  }

  onSubmit() {
  }
}
