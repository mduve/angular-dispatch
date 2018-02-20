import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-dispatch5',
  templateUrl: './dispatch5.component.html',
  styleUrls: ['./dispatch5.component.css']
})
export class Dispatch5Component {

  branchName;
  rows;
  columns;
  selected = [];
 
  constructor(private afs: AngularFirestore) {

    let storageValue = window.localStorage.getItem('name');
    this.branchName = JSON.parse(storageValue);

    this.getData();
  }
 
  getData() {
    this.afs.collection('stocks').valueChanges().subscribe((stocks) => {
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
