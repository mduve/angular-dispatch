import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class Dispatch1Service {

  constructor(private afs: AngularFirestore) { }

  // addStudent(studentData) {
  //   this.afs.collection('students').add(studentData).then(() => {
  //     console.log('Done');
  //   })
  // }

  getStocks() {
    //return this.afs.collection('stocks', ref => ref.orderBy('number')).valueChanges();

    return this.afs.collection('stocks', ref => ref.orderBy('number')).valueChanges();


  }

  filterData(customfilters) {
    return new Promise((resolve, reject) => {
      if (customfilters.criteria == '')
        reject();
      if (customfilters.filtervalue == '')
        reject();
      resolve(this.afs.collection('dipatch', ref =>
        ref.where(customfilters.field, customfilters.criteria, customfilters.filtervalue)).valueChanges());
    })
  }

}
