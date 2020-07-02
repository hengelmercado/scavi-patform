import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map, first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: User;

  constructor(private afsAuth: AngularFireAuth, private router: Router) { }

  async registerUser(email: string, password: string) {
    try {
      const result = await new Promise( (resolve, reject) => {
        this.afsAuth.createUserWithEmailAndPassword(email, password)
        .then(userData => resolve(userData),
        err => reject(err));
      });

      return result;
    } catch (error) {
      console.log('error', error);
    }
  }

  async loginEmailUser(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afsAuth.signInWithEmailAndPassword(email, password)
      .then(userData => resolve(userData),
      err => reject(err));
    });
  }

  async loginGoogleUser() {
    return this.afsAuth.signInWithPopup( new auth.GoogleAuthProvider());
  }

  async logoutUser() {
    try {
      await this.afsAuth.signOut();
    } catch (error) {
      console.log('error', error);
    }
  }

  getCurrentUSer() {
    return this.afsAuth.authState.pipe(first()).toPromise();
  }

  isAuth() {
    return this.afsAuth.authState.pipe(map( auth => auth));
  }
}
