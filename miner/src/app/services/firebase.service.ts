import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword,createUserWithEmailAndPassword,signOut } from '@angular/fire/auth';
import { LoginData } from '../interfaces/login-data.interface';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  isLoggedIn = false;
  constructor(private firebaseAuth: Auth) {}

  login({ email, password }: any) {
    return signInWithEmailAndPassword(this.firebaseAuth, email, password);
  }
  register({ email, password }: LoginData) {
    return createUserWithEmailAndPassword(this.firebaseAuth, email, password);
  }

  logout() {
    return signOut(this.firebaseAuth);
  }
}
