import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { LoginData } from '../../interfaces/login-data.interface';
import { Router } from '@angular/router';
import { FormControl, FormGroup,FormBuilder,Validators  } from '@angular/forms';
import { ParticlesConfig } from './particles-config';
declare let particlesJS: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  title = 'Log in - Miner';
  hide = true;
  @Output() formData: EventEmitter<{
    email: string;
    password: string;
  }> = new EventEmitter();

  form: FormGroup;

  constructor(
    private readonly authService: FirebaseService,
    private readonly router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.invokeParticles();
    this.form = this.fb.group({
      email: [' ', [Validators.required, Validators.email]],
      password: [' ', Validators.required],
    });
  }
  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  onSubmit() {
    this.formData.emit(this.form.value);
    console.log(this.form.value)
  }
  
  login(loginData: LoginData) {
    this.authService
      .login(loginData)
      .then(() => this.router.navigate(['/dashboard']))
      .catch((e) => console.log(e.message));
  }
  public invokeParticles(): void {
    particlesJS('particles-js', ParticlesConfig, function() {});
  }
}
