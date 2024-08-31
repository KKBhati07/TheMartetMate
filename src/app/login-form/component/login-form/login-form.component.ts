import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from "../../../services/auth-service";
import {MAT_BOTTOM_SHEET_DATA} from "@angular/material/bottom-sheet";
import {URLS} from "../../../urls";

@Component({
  selector: 'mm-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent implements OnInit {
  renderComponent = false;
  formHeading = 'Welcome to MM!'
  showPassword = false;
  loginForm: FormGroup;
  invalidEmailText = '';
  isBottomSheet = false
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private authService:AuthService,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.checkForBottomSheet()
    this.renderComponent = true;
    this.cdr.markForCheck();
  }
  private checkForBottomSheet() {
    if(this.data?.openInBottomSheet){
      this.isBottomSheet = this.data.openInBottomSheet;
    }
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
    this.cdr.markForCheck();
  }

  navigateToLoginForm() {
    this.router.navigate([URLS.AUTH.SIGNUP.split('/')])
  }

  closeForm() {
    this.loginForm.reset();
    this.router.navigate(['/'])
  }

  getEmailValidation(submitBtnValidations = false) {
    if (submitBtnValidations) {
      return this.loginForm.get('email')?.hasError('required') ||
        this.loginForm.get('email')?.hasError('email') ||
        this.loginForm.get('password')?.hasError('required')
    }
    const isEmpty = this.loginForm.get('email')?.hasError('required');
    const isInvalid = this.loginForm.get('email')?.hasError('email');
    if (isEmpty) this.invalidEmailText = 'Email is required';
    else {
      this.invalidEmailText = 'Invalid email';
    }
    this.cdr.markForCheck();
    return this.loginForm.get('email')?.touched && (isEmpty || isInvalid);
  }

  getPassValidation() {
    return this.loginForm.get('password')?.hasError('required') &&
      this.loginForm.get('password')?.touched
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.handleFormValidationError();
      return;
    }
    const {email, password} = this.loginForm.value;
    this.authService.loginUser({email, password}).subscribe(res=>{
    // TODO::Notification Service
    })


  }

  private handleFormValidationError() {

  }
}
