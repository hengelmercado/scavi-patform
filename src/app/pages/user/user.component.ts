import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserComplementService } from 'src/app/services/user-complement.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserComplemetnInterfase } from '../../models/user-complemetn';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';
import { UserInterface } from 'src/app/models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: [
  ]
})
export class UserComponent implements OnInit {

  id: string;
  idb: boolean = false;

  title: string = 'Usuario';
  subtitle: string = 'Datos del usuario';
  icon: string = 'pe-7s-user';
  bText: string = 'Lista';
  bIcon: string = 'fa-list';
  lRoute: string = '/entities';
  bVisible: boolean = false;

  userForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [Validators.required, Validators.minLength(4)]),
    documentType: new FormControl('', [Validators.required, Validators.minLength(2)]),
    document: new FormControl('', [Validators.required, Validators.minLength(4)]),
    phone: new FormControl('', [Validators.required, Validators.minLength(7)]),
    address: new FormControl('', [Validators.required, Validators.minLength(4)]),
    birthday: new FormControl('', [Validators.required, Validators.minLength(10)]),
    weight: new FormControl('', [Validators.required, Validators.minLength(2)]),
    height: new FormControl('', [Validators.required, Validators.minLength(2)]),
    bloodType: new FormControl('', [Validators.required, Validators.minLength(1)]),
    rh: new FormControl('', [Validators.required, Validators.minLength(1)]),
  });

  constructor(
    private eService: UserComplementService,
    private router: Router,
    private route: ActivatedRoute,
    private aService: AuthService
    ) { }

  providerId: string = '';
  user: UserComplemetnInterfase;
  bloodTyoe = ['A', 'B', 'AB', 'O'];
  photoUrl: string;

  onAdd() {
    const user: UserComplemetnInterfase = this.userForm.value;
    if (this.id === undefined) {
        this.eService.add(user).then( (res) => {
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
              //this.router.navigate(['entities']);
            }
          });
        }).catch( (err) => {
          console.log('error', err.message);
          Swal.fire('Error', err.message);
        });
      } else {
        this.eService.update(user).then( (res) => {
          Swal.fire({
            icon: 'success',
            title: 'Se actualizo correctamenet',
            showConfirmButton: true,
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ok!'
          }).then((result) => {
            if (result.value) {
              //this.router.navigate(['entities']);
            }
          });
        }).catch( (err) => {
          console.log('error', err.message);
          Swal.fire('Error', err.message);
        });
      }
  }

 /*  getDetails(id: string): void {
    this.eService.getOne(id).subscribe( user => {
      this.user = user;
    });
  } */

  onPreUpdate(user: UserComplemetnInterfase) {
    this.eService.selectedEntity = Object.assign({}, user);
  }

  getActual() {
    // return this.eService.selectedEntity;
    this.id = this.eService.selectedEntity.id;
    if (this.id !== undefined) {
      this.idb = true;
    }
    this.userForm.patchValue({
      id: this.eService.selectedEntity.id,
      name: this.eService.selectedEntity.name,
      lastName: this.eService.selectedEntity.lastName,
      email: this.eService.selectedEntity.email,
      documentType: this.eService.selectedEntity.documentType,
      document: this.eService.selectedEntity.document,
      phone: this.eService.selectedEntity.phone,
      address: this.eService.selectedEntity.address,
      birthday: this.eService.selectedEntity.birthday,
      weight: this.eService.selectedEntity.weight,
      height: this.eService.selectedEntity.height,
      bloodType: this.eService.selectedEntity.bloodType,
      rh: this.eService.selectedEntity.rh
    });
  }

  onGetOne(id: string) {
    this.eService.getOne(id).subscribe( usr => {
      console.log(usr);
      this.onPreUpdate(usr[0]);
      this.getActual();
    });
  }

  userLoged() {
    this.aService.isAuth().subscribe( user => {
      if (user) {
        this.onGetOne(user.email);
        this.photoUrl = user.photoURL;
        this.userForm.patchValue({
          name: user.displayName,
          email: user.email,
          photoUrl: user.photoURL
        });
      }
    });
  }

  get f() { return this.userForm.controls; }

  ngOnInit() {
    this.userForm.reset();
    this.userLoged();
    this.getActual();
  }

}
