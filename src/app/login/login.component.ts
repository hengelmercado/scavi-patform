import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormGroup, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private afAuth: AngularFireAuth) { }
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  ngOnInit(): void {
  }

  public email: string = '';
  public password: string = '';

  onLogin(): void {
    const {email, password} = this.loginForm.value;
    console.log(this.loginForm.value);
    this.authService.loginEmailUser(email, password)
    .then( (res) => {
      console.log(res);
      this.router.navigate(['/']);
    }).catch( (err) => {
      Swal.fire('error', err.message);
    });
  }

  onLoginGoogle() {
    // this.afAuth.signInWithPopup( new auth.GoogleAuthProvider());
    this.authService.loginGoogleUser()
    .then( (res) => {
      console.log(res);
      this.router.navigate(['/']);
    }).catch( (err) => {
      Swal.fire('error', err.message);
    });
  }

  onLogout() {
    this.afAuth.signOut();
  }
}
