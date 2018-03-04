import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class FirecloudService {

  constructor(private afs: AngularFirestore) { 
  }

  getStocks() {
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

  getBranches() {
    
  }


}



// import { Injectable } from '@angular/core';
// import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
// import { Observable } from 'rxjs/Observable';

// export interface Branch {
//   name: string;
//   id: number;
// }

// @Injectable()
// export class FirecloudService {

//   branchCollectionRef: AngularFirestoreCollection<Branch>;
//   branch$: Observable<Branch[]>;

//   constructor(private afs: AngularFirestore) { 
//       this.branchCollectionRef = this.afs.collection<Branch>('branches');
//       this.branch$ = this.branchCollectionRef.valueChanges();
//   }

//   getStocks() {
//     return this.afs.collection('stocks', ref => ref.orderBy('number')).valueChanges();
//   }

//   filterData(customfilters) {
//     return new Promise((resolve, reject) => {
//       if (customfilters.criteria == '')
//         reject();
//       if (customfilters.filtervalue == '')
//         reject();
//       resolve(this.afs.collection('dipatch', ref =>
//         ref.where(customfilters.field, customfilters.criteria, customfilters.filtervalue)).valueChanges());
//     })
//   }

//   firestore 
//   getBranches() {
//       return this.branchCollectionRef.snapshotChanges()
//         .startWith(null)
//         .map(member => member ? this.filterBranches(name) : this.branch$.slice());    
//   }

//   filterBranches(val: string) {
//     return this.branch$
//     .map(response => response.filter(option => { 
//       return option.name.toLowerCase().indexOf(val.toLowerCase()) === 0
//     }));
//   }

// }
