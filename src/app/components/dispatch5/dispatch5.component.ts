import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-dispatch5',
  templateUrl: './dispatch5.component.html',
  styleUrls: ['./dispatch5.component.css']
})
export class Dispatch5Component {

  branchName;
  branchId;

  rows;
  columns;
  selected = [];

  constructor(private afs: AngularFirestore) {

    let brNameValue = window.localStorage.getItem('branchname');
    this.branchName = JSON.parse(brNameValue);

    let brIdValue = window.localStorage.getItem('branchid');
    this.branchId = JSON.parse(brIdValue);

    this.getData(this.branchId);
  }


  getData(branchdata) {
    this.afs.collection('stocks', ref => ref.where("branchId", "==", branchdata)).valueChanges().subscribe((stocks) => {
      this.rows = stocks;
    })
  }

  onSelect({ selected }) {
    //console.log('Select Event', selected, this.selected);

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onActivate(event) {
    //console.log('Activate Event', event);
  }


}
