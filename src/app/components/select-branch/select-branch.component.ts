// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-select-branch',
//   templateUrl: './select-branch.component.html',
//   styleUrls: ['./select-branch.component.css']
// })
// export class SelectBranchComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }

//////firestore database

import { Component, OnInit } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { FormControl } from '@angular/forms';

export interface Branch {
  id?: string;
  name: string;
  branchId: number;
}

@Component({
  selector: 'app-select-branch',
  templateUrl: './select-branch.component.html',
  styleUrls: ['./select-branch.component.css']
})
export class SelectBranchComponent implements OnInit {


    branches: any = [];
    branchCtrl: FormControl = new FormControl();
    filteredBranches: Observable<any[]>;

    branchCol: AngularFirestoreCollection<Branch>;
    branch$: Observable<Branch[]>;

    //local storage
    branchName;
    branchId;
    branchLat;
    branchLng;
    branchZoom;
    branchAddress;
    brNameKey: string;
    brIdKey: string;
    brLatKey: string;
    brLngKey: string;
    brZoomKey: string;
    brAddressKey: string;


    constructor( private afs: AngularFirestore ) {
      this.brNameKey = 'branchname';
      this.brIdKey = 'branchid';
      this.brLatKey = 'branchlat';
      this.brLngKey = 'branchlng';
      this.brZoomKey = 'branchzoom';
      this.brAddressKey = 'branchaddress';
    }

    ngOnInit() {

      this.branchCol = this.afs.collection('branches');
      this.branch$ = this.branchCol.valueChanges();
      //this.branch$ = this.branchCol.snapshotChanges().map(actions => { return actions.map(action => { const data = action.payload.doc.data() as Branch; const id = action.payload.doc.id; return { id, ...data }; }); });

      this.branches = this.branch$;

      this.filteredBranches = this.branchCtrl.valueChanges
        .startWith(null)
        .map(b => b && typeof b === 'object' ? b.name : b)
        .switchMap(val => {
          return this.filterBranches(val || '')
        });

      let brNameValue = window.localStorage.getItem(this.brNameKey);
      let brIdValue = window.localStorage.getItem(this.brIdKey);
      let brLatValue = window.localStorage.getItem(this.brLatKey);
      let brLngValue = window.localStorage.getItem(this.brLngKey);
      let brZoomValue = window.localStorage.getItem(this.brZoomKey);
      let brAddressValue = window.localStorage.getItem(this.brAddressKey);
      this.branchName = JSON.parse(brNameValue);
      this.branchId = JSON.parse(brIdValue);
      this.branchLat = JSON.parse(brLatValue);
      this.branchLng = JSON.parse(brLngValue);
      this.branchZoom = JSON.parse(brZoomValue);
      this.branchAddress = JSON.parse(brAddressValue);
        
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

    //fetch stock data into table
    getBranch(value){
      this.branchName = value.name;
      this.branchId = value.branchId;
      this.branchLat = value.lat;
      this.branchLng = value.lng;
      this.branchZoom = value.zoom;
      this.branchAddress = value.address;

      let brNameValue = JSON.stringify(this.branchName);
      let brIdValue = JSON.stringify(this.branchId);
      let brLatValue = JSON.stringify(this.branchLat);
      let brLngValue = JSON.stringify(this.branchLng);
      let brZoomValue = JSON.stringify(this.branchZoom);
      let brAddressValue = JSON.stringify(this.branchAddress);

      window.localStorage.setItem(this.brNameKey, brNameValue);
      window.localStorage.setItem(this.brIdKey, brIdValue);
      window.localStorage.setItem(this.brLatKey, brLatValue);
      window.localStorage.setItem(this.brLngKey, brLngValue);
      window.localStorage.setItem(this.brZoomKey, brZoomValue);
      window.localStorage.setItem(this.brAddressKey, brAddressValue);

    }

    onClear(){
      window.localStorage.removeItem(this.brNameKey);
      window.localStorage.removeItem(this.brIdKey);
      window.localStorage.removeItem(this.brLatKey);
      window.localStorage.removeItem(this.brLngKey);
      window.localStorage.removeItem(this.brZoomKey);
      window.localStorage.removeItem(this.brAddressKey);
      location.reload();
    }

    refresh(){
      location.reload();
    }


}

