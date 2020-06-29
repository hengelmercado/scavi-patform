import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserInterface } from 'src/app/models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService) { }

  user: UserInterface = {
    name: '',
    email: '',
    photoUrl: ''
  };

  public providerId: string = '';

  ngOnInit(): void {
    this.authService.isAuth().subscribe( user => {
      if (user) {
        this.user.name = user.displayName;
        this.user.email = user.email;
        this.user.photoUrl = user.photoURL;
        this.providerId = user.providerData[0].providerId;
        console.log('USER', user);
      }
    });
  }

  onLogout(): void {
    this.authService.logoutUser();
  }

}
