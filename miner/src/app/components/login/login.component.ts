import { Component, OnInit} from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { LoginData } from '../../interfaces/login-data.interface';
import { DialogData } from '../../interfaces/eLogInHandler.interface';
import { Router } from '@angular/router';
import { FormGroup,FormBuilder,Validators  } from '@angular/forms';
import { ParticlesConfig } from './particles-config';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ELoginCompHanderComponent } from '../../handlers/e-login-comp-hander/e-login-comp-hander.component';

declare let particlesJS: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  title = 'Log in - Miner';
  hide = true;

  form: FormGroup;

  constructor(
    private readonly authService: FirebaseService,
    private readonly router: Router,
    private fb: FormBuilder,
    public dialog: MatDialog
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
   this.login(this.form.value);
  }
  
  login(loginData: LoginData) {
    this.authService
      .login(loginData)
      .then(() => this.router.navigate(['/dashboard']))
      .catch((e) => this.openDialog(e.code));
  }
  openDialog(error: DialogData) {
    this.dialog.open(ELoginCompHanderComponent, {
      data: {
        error: error,
      }
    }
  );
};


  loginWithGoogle() {
    this.authService
      .loginWithGoogle()
      .then(() => this.router.navigate(['/dashboard']))
      .catch((e) => console.log(e.message)); //TODO create popup window with error
  }
  
  public invokeParticles(): void {
    particlesJS('particles-js', ParticlesConfig, function() {});
  }
}
