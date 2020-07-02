import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { LevelService } from 'src/app/services/level.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LevelInterfase } from 'src/app/models/level';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-level',
  templateUrl: './form-level.component.html',
  styles: [
  ]
})

export class FormLevelComponent implements OnInit {
  id: string;
  idb: boolean = false;

  title: string = 'Level';
  subtitle: string = '';
  icon: string = 'pe-7s-menu';
  bText: string = 'Lista';
  bIcon: string = 'fa-list';
  lRoute: string = '/level';

  formGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    description: new FormControl(''),
    enabled: new FormControl('')
  });

  constructor(private eService: LevelService, private router: Router, private route: ActivatedRoute) { }
  element: LevelInterfase;

  onAdd() {
    const element: LevelInterfase = this.formGroup.value;
    if (this.id === undefined) {
      element.enabled = element.enabled === null? false : element.enabled;
      element.description = element.description === null? '' : element.description;
      this.eService.add(element)
      .then( res => {
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
            this.router.navigate(['level']);
          }
        });
      }).catch( err => {
        console.log('Error', err.message);
        Swal.fire('Error', err.message);
      });
    }else {
      this.eService.update(element)
      .then( res => {
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
            this.router.navigate(['level']);
          }
        });
      }).catch( (err) => {
        console.log('error', err.message);
        Swal.fire('Error', err.message);
      });
    }
  }

  getDetails(id: string) {
    this.eService.getOne(id).subscribe( element => {
      this.element = element;
    });
  }

  onPreUpdate(element: LevelInterfase) {
    this.eService.selectedElement = Object.assign({}, element);
  }

  getActual() {
    this.formGroup.patchValue({
      id: this.eService.selectedElement.id,
      name: this.eService.selectedElement.name,
      description: this.eService.selectedElement.description,
      enabled: this.eService.selectedElement.enabled
    });
  }

  onGetOne(id: string) {
    this.eService.getOne(id).subscribe( element => {
      this.onPreUpdate(element);
      this.getActual();
    });
  }

  get f() { return this.formGroup.controls; }

  ngOnInit(): void {
    this.formGroup.reset();
    this.id = this.route.snapshot.params.id;

    if (this.id !== undefined){
      this.getActual();
      this.idb = true;
    }

    if (this.eService.selectedElement.id === undefined){
      this.onGetOne(this.id);
    }

    if (this.idb !== true) {
      this.subtitle = 'Nuevo nivel';
    }else {
      this.subtitle = 'Editar nivel';
    }
  }

}
