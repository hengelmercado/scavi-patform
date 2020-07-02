import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {UserComplemetnInterfase} from '../models/user-complemetn';

@Injectable({
  providedIn: 'root'
})
export class UserComplementService {

  constructor(private asf: AngularFirestore) {
    this.usersCollection = asf.collection<UserComplemetnInterfase> ('users', ref => ref.orderBy("timestamp", "desc"));
    this.users = this.usersCollection.valueChanges();
  }

  private usersCollection: AngularFirestoreCollection<UserComplemetnInterfase>;
  private users: Observable<UserComplemetnInterfase[]>;
  private entityDoc: AngularFirestoreDocument<UserComplemetnInterfase>;
  private entity: Observable<UserComplemetnInterfase>;
  public selectedEntity: UserComplemetnInterfase = {};

  private Add = {
    name: '',
    lastName: '',
    email: '',
    documentType: '',
    document: 0,
    phone: 0,
    address: '',
    birthday: '',
    weight: 0,
    height: 0,
    bloodType: '',
    rh: '',
    timestamp: new Date().getTime(),
  };

  addParameters(entity: UserComplemetnInterfase) {
    this.Add.name = entity.name;
    this.Add.lastName = entity.lastName;
    this.Add.email = entity.email;
    this.Add.documentType = entity.documentType;
    this.Add.document = entity.document;
    this.Add.phone = entity.phone;
    this.Add.address = entity.address;
    this.Add.birthday = entity.birthday;
    this.Add.weight = entity.weight;
    this.Add.height = entity.height;
    this.Add.bloodType = entity.bloodType;
    this.Add.rh = entity.rh;
  }

  /* allEntities(): Observable<UserComplemetnInterfase[]> {
    return this.asf.collection(
      'users',
      ref => ref.orderBy("timestamp", "desc")
    )
    .snapshotChanges()
    .pipe(map(snaps => {
      return snaps.map(snap => {
        return {
          id: snap.payload.doc.id,
          ...snap.payload.doc.data()
        } as UserComplemetnInterfase;
      });
    }));
  } */

  getAll() {
    return this.users = this.usersCollection.snapshotChanges()
    .pipe(map(change => {
      return change.map( action => {
        const data = action.payload.doc.data() as UserComplemetnInterfase;
        data.id = action.payload.doc.id;
        return data;
      });
    }));
  }

  getOne(email: string): Observable<UserComplemetnInterfase[]> {
    return this.asf.collection<UserComplemetnInterfase>(
      'users',
      ref => ref.where('email', '==', email)
      )
      .snapshotChanges()
      .pipe(map(snaps => {
        return snaps.map(snap => {
          if(snap.payload.doc.exists === false){
            return null;
          }else {
            const data = snap.payload.doc.data();
            data.id = snap.payload.doc.id;
            return data;
          }
        });
      }));

    /* return this.entity = this.entityDoc.snapshotChanges().pipe(map(action => {
    if (action.payload.exists === false) {
      return null;
    } else {
      const data = action.payload.data() as UserComplemetnInterfase;
      data.id = action.payload.id;
      return data;
    }
    })); */
  }

  async add(entity: Partial<UserComplemetnInterfase>) {
    try {
      await this.addParameters(entity);
      await new Promise( (resolve, reject) => {
        this.usersCollection.add(this.Add)
        .then(entityData => resolve(entityData),
        err => reject(err));
      });
    } catch (error) {
      console.log('error', error);
    }
  }

  async update(entity: UserComplemetnInterfase) {
    try {
      await new Promise((resolve, rejects) => {
        const id: string = entity.id;
        this.entityDoc = this.asf.doc<UserComplemetnInterfase>(`users/${id}`);
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
      this.entityDoc = this.asf.doc<UserComplemetnInterfase>(`users/${id}`);
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
