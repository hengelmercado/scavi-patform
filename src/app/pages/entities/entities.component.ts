import { Component, OnInit } from '@angular/core';
import { EntitiesService } from '../../services/entities.service';
import { EntitiesInterfase } from '../../models/entities';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-entities',
  templateUrl: './entities.component.html',
  styles: [
  ]
})
export class EntitiesComponent implements OnInit {
  title: string = 'Entidades';
  subtitle: string = 'Listado de Entidades';
  icon: string = 'pe-7s-menu';
  bText: string = 'Nuevo';
  bIcon: string = 'fa-plus';
  lRoute: string = '/entities/create';

  constructor(private eService: EntitiesService, private router: Router) { }
  public entities: EntitiesInterfase[];

  getLis() {
    this.eService.getAll().subscribe(entities => {
      this.entities = entities;
    });
  }

  onDelete(id: string) {
    Swal.fire({
      icon: 'info',
      title: 'Esta seguro de eliminar este registro?',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.value) {
        this.eService.delete(id)
        .then(res => {
          Swal.fire('Registro Eliminado');
        })
        .catch((err) => {
          Swal.fire('error', err.message);
        });
      }
    });
  }

  onPreUpdate(entity: EntitiesInterfase) {
    this.eService.selectedEntity = Object.assign({}, entity);
    this.router.navigate(['entities/update', entity.id]);
  }

  ngOnInit(){
    this.getLis();
  }

}
