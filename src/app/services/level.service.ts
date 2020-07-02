import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LevelInterfase } from '../models/level';

@Injectable({
  providedIn: 'root'
})
export class LevelService {

  constructor(private asf: AngularFirestore) {
    this.colection = asf.collection<LevelInterfase> ('levels', ref => ref.orderBy('timestamp', 'desc'));
    this.elements = this.colection.valueChanges();
  }

  private colection: AngularFirestoreCollection<LevelInterfase>;
  private elements: Observable<LevelInterfase[]>;
  private document: AngularFirestoreDocument<LevelInterfase>;
  private elemet: Observable<LevelInterfase>;
  public selectedElement: LevelInterfase = {};

  private Add = {
    name: '',
    description: '',
    timestamp: new Date().getTime(),
    enabled: false
  };

  addParameters(element: LevelInterfase) {
    this.Add.name = element.name;
    this.Add.description = element.description;
    this.Add.enabled = element.enabled;
  }

  getAll(): Observable<LevelInterfase[]> {
    return this.elements = this.colection.snapshotChanges()
    .pipe(map(change => {
      return change.map(action => {
        const data = action.payload.doc.data() as LevelInterfase;
        data.id = action.payload.doc.id;
        return data;
      });
    }));
  }

  getOne(id: string) {
    this.document = this.asf.doc<LevelInterfase>(`elements/${id}`);
    return this.elemet = this.document.snapshotChanges()
    .pipe(map(action => {
      if(action.payload.exists === false){
        return null;
      }else {
        const data = action.payload.data() as LevelInterfase;
        data.id = action.payload.id;
        return data;
      }
    }));
  }

  async add(element: LevelInterfase){
    try {
      await this.addParameters(element);
      console.log(this.Add);
      await new Promise( (resolve, reject) => {
      this.colection.add(this.Add)
      .then(elementData => resolve(elementData),
      err => reject(err));
    });
    } catch (error) {
      console.log('Errors', error
      );
    }
  }

  async update(element: LevelInterfase){
    try {
      await new Promise((resolve, reject) => {
        const id: string = element.id;
        this.document = this.asf.doc<LevelInterfase>(`levels/${id}`);
        this.document.update(element)
        .then(elementData => resolve(elementData),
        err => reject(err));
      });
    } catch (error) {
      console.log('error', error);
    }
  }

  async delete(id: string) {
    try {
      this.document = this.asf.doc<LevelInterfase>(`levels/${id}`);
      await new Promise((resolve, rejects) => {
        this.document.delete()
        .then(elementData => resolve(elementData),
        err => rejects(err));
      });
    } catch (error) {
      console.log('error', error);
    }
  }

}

