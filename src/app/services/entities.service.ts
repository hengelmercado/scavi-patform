import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { EntitiesInterfase } from '../models/entities';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EntitiesService {

  constructor(private asf: AngularFirestore) {
    this.entitiesCollection = asf.collection<EntitiesInterfase> ('entities', ref => ref.orderBy("timestamp", "desc"));
    this.entities = this.entitiesCollection.valueChanges();
  }

  private entitiesCollection: AngularFirestoreCollection<EntitiesInterfase>;
  private entities: Observable<EntitiesInterfase[]>;
  private entityDoc: AngularFirestoreDocument<EntitiesInterfase>;
  private entity: Observable<EntitiesInterfase>;
  public selectedEntity: EntitiesInterfase = {};

  private entityAdd = {
    name: '',
    nit: '',
    contact: '',
    phone: '',
    address: '',
    country: '',
    city: '',
    description: '',
    timestamp: new Date().getTime(),
    enabled: false
  };

  addParameters(entity: EntitiesInterfase) {
    this.entityAdd.name = entity.name;
    this.entityAdd.nit = entity.nit;
    this.entityAdd.contact = entity.contact;
    this.entityAdd.phone = entity.phone;
    this.entityAdd.address = entity.address;
    this.entityAdd.country = entity.country;
    this.entityAdd.city = entity.city;
    this.entityAdd.description = entity.description;
    this.entityAdd.enabled = entity.enabled;
  }

  /* allEntities(): Observable<EntitiesInterfase[]> {
    return this.asf.collection(
      'entities',
      ref => ref.orderBy("timestamp", "desc")
    )
    .snapshotChanges()
    .pipe(map(snaps => {
      return snaps.map(snap => {
        return {
          id: snap.payload.doc.id,
          ...snap.payload.doc.data()
        } as EntitiesInterfase;
      });
    }));
  } */

  getAll() {
    return this.entities = this.entitiesCollection.snapshotChanges()
    .pipe(map(change => {
      return change.map( action => {
        const data = action.payload.doc.data() as EntitiesInterfase;
        data.id = action.payload.doc.id;
        return data;
      });
    }));
  }

  getOne(id: string) {
    this.entityDoc = this.asf.doc<EntitiesInterfase>(`entities/${id}`);
    return this.entity = this.entityDoc.snapshotChanges().pipe(map(action => {
    if (action.payload.exists === false) {
      return null;
    } else {
      const data = action.payload.data() as EntitiesInterfase;
      data.id = action.payload.id;
      return data;
    }
    }));
  }

  async add(entity: EntitiesInterfase) {
    try {
      await this.addParameters(entity);
      await new Promise( (resolve, reject) => {
        this.entitiesCollection.add(this.entityAdd)
        .then(entityData => resolve(entityData),
        err => reject(err));
      });
    } catch (error) {
      console.log('error', error);
    }
  }

  async update(entity: EntitiesInterfase) {
    try {
      await new Promise((resolve, rejects) => {
        const id: string = entity.id;
        this.entityDoc = this.asf.doc<EntitiesInterfase>(`entities/${id}`);
        this.entityDoc.update(entity)
        .then(entityData => resolve(entityData),
        err => rejects(err));
      });
    } catch (error) {
      console.log('error', error);
    }
  }

  async delete(id: string) {
    try {
      this.entityDoc = this.asf.doc<EntitiesInterfase>(`entities/${id}`);
      await new Promise((resolve, reject) => {
        this.entityDoc.delete()
        .then(entityData => resolve(entityData),
        err => reject(err));
      });
    } catch (error) {
      console.log('Error', error.message);
    }
  }
}
