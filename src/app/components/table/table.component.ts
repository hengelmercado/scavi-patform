import { Component, OnInit, Input } from '@angular/core';
import { InstrumentServiceService } from 'src/app/services/instrument-service.service';
import {InstrumentInterface} from '../../models/instrument';
import Swal from 'sweetalert2';
import { from } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styles: [
  ]
})
export class TableComponent implements OnInit {

  @Input() thead: string[] = [];
  @Input() data: any[] = [];
  @Input() delete: string = '';
  @Input() update: string = '';

  constructor(private instService: InstrumentServiceService) { }

  onDeleteInstrument(idInstrument: string) {
    this.instService.deleteInstrument(idInstrument);
  }

  onDelete(id: string) {
    let result: any;
    switch (this.delete){
      case 'instrument':
        result = this.instService.deleteInstrument(id);
        break;
    }

    result.then( (res) => {
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
        }
      });
    }).catch( (err) => {
      console.log('error', err.message);
      Swal.fire('Any fool can use a computer');
    });
  }

  onPreUpdate(data) {
    switch (this.update){
      case 'instrument':
        const instrument: InstrumentInterface = data;
        this.instService.selectedInstrument = instrument;
        break;
    }
  }

  ngOnInit(): void {
  }

}
