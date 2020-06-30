import { Component, OnInit } from '@angular/core';
import { InstrumentServiceService } from 'src/app/services/instrument-service.service';
import { Router } from '@angular/router';
import { InstrumentInterface } from 'src/app/models/instrument';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instrument',
  templateUrl: './instrument.component.html',
  styles: [
  ]
})
export class InstrumentComponent implements OnInit {

  title: string = 'Instrumentos';
  subtitle: string = 'Listado de Instrumentos';
  icon: string = 'pe-7s-menu';
  bText: string = 'Nuevo';
  bIcon: string = 'fa-plus';
  lRoute: string = '/instrument/create';

  constructor(private instrumentServiceService: InstrumentServiceService, private router: Router) { }
  public instruments: InstrumentInterface[];
  public thead = ['#', 'Nombre', 'Codigo', 'Descripción', 'Habilitado', '', ''];

  getListInstrument() {
    this.instrumentServiceService.getAllInstrument().subscribe(instruments => {
      this.instruments = instruments;
    });
  }

  onDeleteInstrument(idInstrument: string) {
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
        this.instrumentServiceService.deleteInstrument(idInstrument)
        .then(res => {
          Swal.fire('Registro Eliminado');
        })
        .catch((err) => {
          Swal.fire('error', err.message);
        });
      }
    });
  }

  onPreUpdateInstrument(instrument: InstrumentInterface) {
    this.instrumentServiceService.selectedInstrument = Object.assign({}, instrument);
    this.router.navigate(['instrument/update', instrument.id]);
  }

  ngOnInit(){
    this.getListInstrument();
  }

}
