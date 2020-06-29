import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    confPassword: new FormControl('')
  });

  constructor(private authService: AuthService, private router: Router) { }
  public email: string = '';
  public password: string = '';
  public confPassword: string = '';

  ngOnInit(): void {
  }

  onAddUser() {
    const { email, password, confPassword } = this.registerForm.value;
    if (email !== '' && password !== '' && confPassword !== ''){
      if (password === confPassword) {
        this.authService.registerUser(email, password)
          .then( (res) => {
            Swal.fire({
              icon: 'success',
              title: 'Se registro correctamenet',
              showConfirmButton: true,
              showCancelButton: false,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Ok!'
            }).then((result) => {
              if (result.value) {
                console.log(res);
                this.router.navigate(['/']);
              }
            });
          }).catch( (err) => {
            console.log('error', err.message);
            Swal.fire('Any fool can use a computer');
          });
      } else {
        Swal.fire('Las contraseñas son diferentes');
      }
    } else {
      Swal.fire('Los campos no pueden ser estar vacios');
    }
  }

}
