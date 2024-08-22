import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

// import { LoginService } from './login.service'; // Adjust the path as necessary

@Component({
  selector: 'mm-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent implements OnInit {
  @Input() isLoginForm=true;
  renderComponent = false;
  formHeading='Welcome to MM!'
  showPassword = false;
  openForm = false;
  loginForm:FormGroup

  constructor(
    private fb: FormBuilder,
    // private loginService: LoginService, // Service for login functionality
    private router: Router,
    private route:ActivatedRoute,
    private cdr:ChangeDetectorRef
  ) {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    console.warn("Oninit called!")
    // this.initializeForm();
    this.setFormHeading();
    this.cdr.markForCheck();
    this.setFormType();
  }

  setFormType(){
    this.route.data.subscribe(data=>{
      this.isLoginForm = data['type'] === 'login';
      this.renderComponent = true;
      setTimeout(()=>{this.openForm=true;this.cdr.markForCheck()
      },500)
      this.cdr.markForCheck();
    })
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
    if(!this.isLoginForm) this.formHeading = 'Sign Up to MM!'
  }
  private initializeForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    // if (this.loginForm.valid) {
    //   const { email, password } = this.loginForm.value;
    //   this.loginService.login(email, password).subscribe(
    //     response => {
    //       // Handle successful login
    //       console.log('Login successful', response);
    //       this.router.navigate(['/home']); // Redirect to home or desired route
    //     },
    //     error => {
    //       // Handle login error
    //       console.error('Login failed', error);
    //     }
    //   );
    // }
  }
}
