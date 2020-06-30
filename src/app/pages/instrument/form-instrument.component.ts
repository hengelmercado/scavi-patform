import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InstrumentServiceService } from 'src/app/services/instrument-service.service';
import { InstrumentInterface } from 'src/app/models/instrument';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-instrument',
  templateUrl: './form-instrument.component.html',
  styles: [
  ]
})
export class FormInstrumentComponent implements OnInit {
  idInstrument: string;
  dInstrument: boolean = false;

  title: string = 'Instrumentos';
  subtitle: string = '';
  icon: string = 'pe-7s-menu';
  bText: string = 'Lista';
  bIcon: string = 'fa-list';
  lRoute: string = '/instrument';

  instrumentForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    code: new FormControl('', [Validators.required, Validators.minLength(4)]),
    description: new FormControl(''),
    enabled: new FormControl('')
  });

  constructor(private instService: InstrumentServiceService, private router: Router, private route: ActivatedRoute) { }
  instrument: InstrumentInterface;

  onAddInstrument() {
    const instrument: InstrumentInterface = this.instrumentForm.value;
    if (instrument.name !== undefined || instrument.code !== undefined || instrument.enabled !== undefined) {
      if (this.idInstrument === undefined) {
        instrument.enabled = instrument.enabled === null? false : instrument.enabled;
        instrument.description = instrument.description === null? '' : instrument.description;
        this.instService.addInstrument(instrument).then( (res) => {
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
              this.router.navigate(['instrument']);
            }
          });
        }).catch( (err) => {
          console.log('error', err.message);
          Swal.fire('Error', err.message);
        });
      } else {
        this.instService.updateInstrument(instrument).then( (res) => {
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
              this.router.navigate(['instrument']);
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

  getDetails(idInstrument: string): void {
    this.instService.getOneInstrument(idInstrument).subscribe( instrument => {
      this.instrument = instrument;
    });
  }

  onPreUpdateInstrument(instrument: InstrumentInterface) {
    this.instService.selectedInstrument = Object.assign({}, instrument);
  }

  getActual() {
    // return this.instService.selectedInstrument;
    this.instrumentForm.patchValue({
      id: this.instService.selectedInstrument.id,
      name: this.instService.selectedInstrument.name,
      code: this.instService.selectedInstrument.code,
      description: this.instService.selectedInstrument.description,
      enabled: this.instService.selectedInstrument.enabled
    });
  }

  onGetOneInstrument(idInstrument: string) {
    this.instService.getOneInstrument(idInstrument).subscribe( instrument => {
      this.onPreUpdateInstrument(instrument);
      this.getActual();
    });
  }

  ngOnInit() {
    this.instrumentForm.reset();
    this.idInstrument = this.route.snapshot.params.id;
    if (this.idInstrument !== undefined ){
      this.getActual();
      this.dInstrument = true;
    }
    if (this.instService.selectedInstrument.id === undefined) {
      this.onGetOneInstrument(this.idInstrument);
    }

    if(this.dInstrument === false) {
      this.subtitle = 'Nuevo instrumento';
    }else {
      this.subtitle = 'Editar instrumento';
    }
  }

}
