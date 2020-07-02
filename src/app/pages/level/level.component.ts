import { Component, OnInit } from '@angular/core';
import { LevelService } from '../../services/level.service';
import { LevelInterfase } from '../../models/level';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { element } from 'protractor';

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styles: [
  ]
})
export class LevelComponent implements OnInit {

  title: string = 'Niveles';
  subtitle: string = 'Listado de niveles';
  icon: string = 'pe-7s-menu';
  bText: string = 'Nuevo';
  bIcon: string = 'fa-plus';
  lRoute: string = '/level/create';

  constructor(private eService: LevelService, private router: Router) { }
  public elements: LevelInterfase[];

  getList() {
    this.eService.getAll().subscribe(elements => {
      this.elements = elements;
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

  onPreUpdate(element: LevelInterfase) {
    this.eService.selectedElement = Object.assign({}, element);
    this.router.navigate(['level/update', element.id]);
  }

  ngOnInit(): void {
    this.getList();
  }

}
