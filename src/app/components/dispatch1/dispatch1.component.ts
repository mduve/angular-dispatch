import { Component, ViewChild, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

//Angular Material 5
import { MatSort } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';

//Services
import { Dispatch1Service } from '../../services/dispatch1.service';

//rxjs
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-dispatch',
  templateUrl: './dispatch1.component.html',
  styleUrls: ['./dispatch1.component.css']
})

export class Dispatch1Component implements OnInit {

  @ViewChild(MatSort) sort: MatSort;


  displayedColumns = ['number', 'status', 'city', 'state', 'due_date'];
  dispatchDatabase = new dispatchDatabase(this.dispatch);
  dataSource;


  constructor(private dispatch: Dispatch1Service, private afs: AngularFirestore) {

  }

  ngOnInit() {
    this.dataSource = new DispatchDataSource(this.dispatchDatabase, this.sort);

  }
}

export class dispatchDatabase {

  dispatchList = new BehaviorSubject([]);
  get data() { return this.dispatchList.value };

  constructor(private dispatch: Dispatch1Service ) {
    this.dispatch.getStocks().subscribe((dispatch) => {
      this.dispatchList.next(dispatch);
    })
  }
}

export class DispatchDataSource extends DataSource<any> {

  constructor(private dispatchDB: dispatchDatabase, private sort: MatSort) {
    super()
  }
  connect(): Observable<any> {
    const dispatchData = [
      this.dispatchDB.dispatchList,
      this.sort.sortChange
    ];

    return Observable.merge(...dispatchData).map(() => {
      return this.getSortedData();
    })
  }

  disconnect() {
  }

  getSortedData() {
    const data = this.dispatchDB.data.slice();
    if (!this.sort.active || this.sort.direction == '') { return data; }

    return data.sort((a, b) => {
      let propertyA: number|string = '';
      let propertyB: number|string = '';

      switch (this.sort.active) {
        case 'number': [propertyA, propertyB] = [a.number, b.number]; break;
        case 'status': [propertyA, propertyB] = [a.status, b.status]; break;
        case 'city': [propertyA, propertyB] = [a.city, b.city]; break;
        case 'state': [propertyA, propertyB] = [a.state, b.state]; break;
        case 'due_date': [propertyA, propertyB] = [a.due_date, b.due_date]; break;
      }

      let valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      let valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this.sort.direction == 'asc' ? 1 : -1);
    });
  }
}
