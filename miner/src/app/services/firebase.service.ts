import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword,createUserWithEmailAndPassword,signOut,GoogleAuthProvider, signInWithPopup} from '@angular/fire/auth';
import { LoginData } from '../interfaces/login-data.interface';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  isLoggedIn = false;

  constructor(private firebaseAuth: Auth) {}

  login({ email, password }: LoginData) {
    return signInWithEmailAndPassword(this.firebaseAuth, email, password);
  }

  loginWithGoogle(){
    return signInWithPopup(this.firebaseAuth, new GoogleAuthProvider());
  }

  register({ email, password }: LoginData) {
    return createUserWithEmailAndPassword(this.firebaseAuth, email, password);
  }

  logout() {
    return signOut(this.firebaseAuth);
  }

  getUserId(){
    return this.firebaseAuth.currentUser?.uid;
  }
}
