import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { InstrumentInterface } from '../models/instrument';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InstrumentServiceService {

  constructor(private asf: AngularFirestore) {
    this.instrumentCollection = asf.collection<InstrumentInterface> ('instrument', ref => ref.orderBy("timestamp", "desc"));
    this.instruments = this.instrumentCollection.valueChanges();
  }

  private instrumentCollection: AngularFirestoreCollection<InstrumentInterface>;
  private instruments: Observable<InstrumentInterface[]>;
  private instrumentDoc: AngularFirestoreDocument<InstrumentInterface>;
  private instrument: Observable<InstrumentInterface>;
  public selectedInstrument: InstrumentInterface = {};

  private Add = {
    name: '',
    code: '',
    description: '',
    timestamp: new Date().getTime(),
    enabled: false
  };

  addParameters(instrument: InstrumentInterface) {
    this.Add.name = instrument.name;
    this.Add.code = instrument.code;
    this.Add.description = instrument.description;
    this.Add.enabled = instrument.enabled;
  }

  /* all(): Observable<InstrumentInterface[]> {
    return this.asf.collection(
      "instrument",
      ref => ref.orderBy("timestamp", "desc")
      )
    .snapshotChanges()
    .pipe(map(snaps => {
      return snaps.map(snap => {
        return {
          id: snap.payload.doc.id,
          ...snap.payload.doc.data()
        } as InstrumentInterface;
      });
    }));
  } */

  getAllInstrument() {
    return this.instruments = this.instrumentCollection.snapshotChanges()
    .pipe(map(change => {
      return change.map( action => {
        const data = action.payload.doc.data() as InstrumentInterface;
        data.id = action.payload.doc.id;
        return data;
      });
    }));
  }

  getOneInstrument(idInstrument: string) {
    this.instrumentDoc = this.asf.doc<InstrumentInterface>(`instrument/${idInstrument}`);
    return this.instrument = this.instrumentDoc.snapshotChanges().pipe(map(action => {
    if (action.payload.exists === false) {
      return null;
    } else {
      const data = action.payload.data() as InstrumentInterface;
      data.id = action.payload.id;
      return data;
    }
    }));
  }

  async addInstrument(instrument: InstrumentInterface) {
    try {
      await this.addParameters(instrument);
      await new Promise( (resolve, reject) => {
        this.instrumentCollection.add(this.Add)
        .then(IsntrumentData => resolve(IsntrumentData),
        err => reject(err));
      });
    } catch (error) {
      console.log('error', error);
    }
  }

  async updateInstrument(instrument: InstrumentInterface) {
    try {
      await new Promise((resolve, rejects) => {
        const idInstrument: string = instrument.id;
        this.instrumentDoc = this.asf.doc<InstrumentInterface>(`instrument/${idInstrument}`);
        this.instrumentDoc.update(instrument)
        .then(IsntrumentData => resolve(IsntrumentData),
        err => rejects(err));
      });
    } catch (error) {
      console.log('error', error);
    }
  }

  async deleteInstrument(idInstrument: string) {
    try {
      this.instrumentDoc = this.asf.doc<InstrumentInterface>(`instrument/${idInstrument}`);
      await new Promise((resolve, reject) => {
        this.instrumentDoc.delete()
        .then(instrumentData => resolve(instrumentData),
        err => reject(err));
      });
    } catch (error) {
      console.log('Error', error.message);
    }
  }
}
