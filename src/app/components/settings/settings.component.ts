import { Component, OnInit } from '@angular/core';
import { StocksService } from '../../services/stocks.service';

import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})

export class SettingsComponent implements OnInit {

  //services
  branchesObservable : Observable<object> ;

  //mat-autocomplete
  branches: any = [];
  branchCtrl: FormControl = new FormControl();
  filteredBranches: Observable<any[]>;

  branchName;
  branchID;
  storageKey: string;

  constructor(
    private stocksService: StocksService,
  ) {
    this.storageKey = 'name';
  }

  ngOnInit() {
    //load branches for mat-autocomplete
    this.branches = this.stocksService.get_branches();
    this.filteredBranches = this.branchCtrl.valueChanges
      .startWith(null)
      .map(b => b && typeof b === 'object' ? b.name : b)
      .switchMap(val => {
        return this.filterBranches(val || '')
      });

    let storageValue = window.localStorage.getItem(this.storageKey);
    this.branchName = JSON.parse(storageValue);
  }

  //mat-autocomplete
  displayFn(b): string {
    return b ? b.name : b;
  }
  filterBranches(val: string) {
    return this.branches.map(response => response.filter(option => {
        return option.name.toLowerCase().indexOf(val.toLowerCase()) === 0
      }));
  }

  //fetch stock data into table
  getBranch(value){
    // console.log(value.name + ' ' + value.branchId);
    this.branchName = value.name;
    this.branchID = value.branchId;

    let storageValue = JSON.stringify(this.branchName);
    window.localStorage.setItem(this.storageKey, storageValue);

  }

  onClear(){
    window.localStorage.removeItem(this.storageKey);
    location.reload();
  }


}
