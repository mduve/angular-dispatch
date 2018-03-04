import { Component, OnInit } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { FormControl } from '@angular/forms';

export interface Branch {
  id?: string;
  name: string;
  branchId: number;
}

@Component({
  selector: 'app-fc-search',
  templateUrl: './fc-search.component.html',
  styleUrls: ['./fc-search.component.css']
})
export class FcSearchComponent implements OnInit {

    branches: any = [];
    branchCtrl: FormControl = new FormControl();
    filteredBranches: Observable<any[]>;

    branchCol: AngularFirestoreCollection<Branch>;
    branch$: Observable<Branch[]>;

    constructor( private afs: AngularFirestore ) {

    }

    ngOnInit() {

      this.branchCol = this.afs.collection('branches');
      //this.branch$ = this.branchCol.valueChanges();
      this.branch$ = this.branchCol.snapshotChanges().map(actions => { return actions.map(action => { const data = action.payload.doc.data() as Branch; const id = action.payload.doc.id; return { id, ...data }; }); });

      this.branches = this.branch$;


      this.filteredBranches = this.branchCtrl.valueChanges
        .startWith(null)
        //.map(b => b && typeof b === 'object' ? b.name : b)
        .switchMap(val => {
          return this.filterBranches(val || '')
        });
    }

    displayFn(b): string {
      return b ? b.name : b;
    }
    filterBranches(val: string) {
      return this.branches
        .map(response => response.filter(option => {
          return option.name.toLowerCase().indexOf(val.toLowerCase()) === 0
        }));
    }

    getBranch(value){
      console.log('branch selected');
    }


}





////////////////////////

// import { Component, OnInit } from '@angular/core';
// import { StocksService } from '../../services/stocks.service';
//
// import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
//
// import { FormControl } from '@angular/forms';
// import { Observable } from 'rxjs/Observable';
//
// export interface Branch {
//   name: string;
//   id: number;
// }
//
// @Component({
//   selector: 'app-fc-search',
//   templateUrl: './fc-search.component.html',
//   styleUrls: ['./fc-search.component.css']
// })
// export class FcSearchComponent implements OnInit {
//
//     branchesObservable : Observable<object> ;
//
//     branches: any = [];
//     branchCtrl: FormControl = new FormControl();
//     filteredBranches: Observable<any[]>;
//
//     branchName;
//     branchId;
//
//     branchCollectionRef: AngularFirestoreCollection<Branch>;
//     branch$: Observable<Branch[]>;
//
//     constructor(private stocksService: StocksService, private afs: AngularFirestore) {
//       this.branchCollectionRef = this.afs.collection<Branch>('branches');
//       this.branch$ = this.branchCollectionRef.valueChanges();
//     }
//
//     ngOnInit() {
//       this.branches = this.stocksService.get_branches();
//       //need to get/return Branches from firestore and assign to this.branches
//
//       this.filteredBranches = this.branchCtrl.valueChanges
//         .startWith(null)
//         .map(b => b && typeof b === 'object' ? b.name : b)
//         .switchMap(val => {
//           return this.filterBranches(val || '')
//         });
//
//     }
//
//     displayFn(b): string {
//       return b ? b.name : b;
//     }
//     filterBranches(val: string) {
//       return this.branches.map(response => response.filter(option => {
//           return option.name.toLowerCase().indexOf(val.toLowerCase()) === 0
//         }));
//     }
//
//     getBranch(value){
//       this.branchName = value.name;
//       this.branchId = value.branchId;
//     }
//
//
// }



/////////////////////


// import { Component, OnInit } from '@angular/core';
// import { StocksService } from '../../services/stocks.service';
//
// import { FormControl } from '@angular/forms';
// import { Observable } from 'rxjs/Observable';
//
// @Component({
//   selector: 'app-fc-search',
//   templateUrl: './fc-search.component.html',
//   styleUrls: ['./fc-search.component.css']
// })
// export class FcSearchComponent implements OnInit {
//
//     branchesObservable : Observable<object> ;
//
//     branches: any = [];
//     branchCtrl: FormControl = new FormControl();
//     filteredBranches: Observable<any[]>;
//
//     branchName;
//     branchId;
//     brNameKey: string;
//     brIdKey: string;
//
//     constructor(
//       private stocksService: StocksService,
//     ) {
//       this.brNameKey = 'branchname';
//       this.brIdKey = 'branchid';
//     }
//
//     ngOnInit() {
//
//       this.branches = this.stocksService.get_branches();
//       this.filteredBranches = this.branchCtrl.valueChanges
//         .startWith(null)
//         .map(b => b && typeof b === 'object' ? b.name : b)
//         .switchMap(val => {
//           return this.filterBranches(val || '')
//         });
//
//
//       let brNameValue = window.localStorage.getItem(this.brNameKey);
//       this.branchName = JSON.parse(brNameValue);
//       let brIdValue = window.localStorage.getItem(this.brIdKey);
//       this.branchId = JSON.parse(brIdValue);
//     }
//
//     displayFn(b): string {
//       return b ? b.name : b;
//     }
//     filterBranches(val: string) {
//       return this.branches.map(response => response.filter(option => {
//           return option.name.toLowerCase().indexOf(val.toLowerCase()) === 0
//         }));
//     }
//
//     getBranch(value){
//       this.branchName = value.name;
//       this.branchId = value.branchId;
//
//       let brNameValue = JSON.stringify(this.branchName);
//       window.localStorage.setItem(this.brNameKey, brNameValue);
//       let brIdValue = JSON.stringify(this.branchId);
//       window.localStorage.setItem(this.brIdKey, brIdValue);
//
//     }
//
// }
