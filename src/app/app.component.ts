import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'scavi';
  public isLogged: Boolean = false;
  constructor(private authService: AuthService, private afAuth: AngularFireAuth, private router: Router) {
  }
  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.authService.isAuth().subscribe( auth => {
      if (auth) {
        console.log('User logged');
        this.isLogged = true;
      } else {
        console.log('User NOT logged');
        this.isLogged = false;
        this.router.navigate(['/login']);
      }
    });
  }
}
