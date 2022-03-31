import { Component, OnInit} from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { LoginData } from '../../interfaces/login-data.interface';
import { DialogData } from '../../interfaces/eLogInHandler.interface';
import { Router } from '@angular/router';
import { FormGroup,FormBuilder,Validators  } from '@angular/forms';
import { ParticlesConfig } from './particles-config';
import { MatDialog, MatDialogConfig} from '@angular/material/dialog';
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
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
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
    var message = this.switchErrorMessage(error);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = message;
    this.dialog.open(ELoginCompHanderComponent, dialogConfig);
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

  switchErrorMessage(e: DialogData){
    let message: string = '';
    switch(message){
      case "auth/user-not-found":
        return message = "Wrong email or password";
        break
      case "auth/too-many-requests":
        return message = "Too many requests. Please wait and try again";
        break
      default:
        return message = "There was an error while logging. Please try again";
    }
  }
}
