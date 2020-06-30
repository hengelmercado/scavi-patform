import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EntitiesService } from 'src/app/services/entities.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EntitiesInterfase } from '../../models/entities';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-entities',
  templateUrl: './form-entities.component.html',
  styles: [
  ]
})
export class FormEntitiesComponent implements OnInit {
  id: string;
  idb: boolean = false;

  title: string = 'Entidad';
  subtitle: string = '';
  icon: string = 'pe-7s-menu';
  bText: string = 'Lista';
  bIcon: string = 'fa-list';
  lRoute: string = '/entities';

  entityForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    nit: new FormControl('', [Validators.required, Validators.minLength(4)]),
    contact: new FormControl('', [Validators.required, Validators.minLength(4)]),
    phone: new FormControl('', [Validators.required, Validators.minLength(4)]),
    address: new FormControl('', [Validators.required, Validators.minLength(4)]),
    country: new FormControl('', [Validators.required, Validators.minLength(4)]),
    city: new FormControl('', [Validators.required, Validators.minLength(4)]),
    description: new FormControl(''),
    enabled: new FormControl('')
  });

  constructor(private eService: EntitiesService, private router: Router, private route: ActivatedRoute) { }
  entity: EntitiesInterfase;

  onAdd() {
    const entity: EntitiesInterfase = this.entityForm.value;
    if (entity.name !== undefined || entity.nit !== undefined || entity.enabled !== undefined) {
      if (this.id === undefined) {
        entity.enabled = entity.enabled === null? false : entity.enabled;
        entity.description = entity.description === null? '' : entity.description;
        this.eService.add(entity).then( (res) => {
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
              this.router.navigate(['entities']);
            }
          });
        }).catch( (err) => {
          console.log('error', err.message);
          Swal.fire('Error', err.message);
        });
      } else {
        this.eService.update(entity).then( (res) => {
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
              this.router.navigate(['entities']);
            }
          });
        }).catch( (err) => {
          console.log('error', err.message);
          Swal.fire('Error', err.message);
        });
      }
    }else{
      Swal.fire('Los campos con * son requeridos');
    }
  }

  getDetails(id: string): void {
    this.eService.getOne(id).subscribe( entity => {
      this.entity = entity;
    });
  }

  onPreUpdate(entity: EntitiesInterfase) {
    this.eService.selectedEntity = Object.assign({}, entity);
  }

  getActual() {
    // return this.eService.selectedEntity;
    this.entityForm.patchValue({
      id: this.eService.selectedEntity.id,
      name: this.eService.selectedEntity.name,
      nit: this.eService.selectedEntity.nit,
      contact: this.eService.selectedEntity.contact,
      phone: this.eService.selectedEntity.phone,
      address: this.eService.selectedEntity.address,
      country: this.eService.selectedEntity.country,
      city: this.eService.selectedEntity.city,
      description: this.eService.selectedEntity.description,
      enabled: this.eService.selectedEntity.enabled
    });
  }

  onGetOne(id: string) {
    this.eService.getOne(id).subscribe( enity => {
      this.onPreUpdate(enity);
      this.getActual();
    });
  }

  ngOnInit() {
    this.entityForm.reset();
    this.id = this.route.snapshot.params.id;
    if (this.id !== undefined ){
      this.getActual();
      this.idb = true;
    }
    if (this.eService.selectedEntity.id === undefined) {
      this.onGetOne(this.id);
    }

    if (this.idb === false) {
      this.subtitle = 'Nueva entidad';
    }else {
      this.subtitle = 'Editar entidad';
    }
  }

}
