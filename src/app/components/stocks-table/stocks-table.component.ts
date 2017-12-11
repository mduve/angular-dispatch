import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { StocksService } from '../../services/stocks.service';

import { DataSource } from '@angular/cdk/collections';
import { Stock } from '../../models/stock.model';

@Component({
  selector: 'app-stocks-table',
  templateUrl: './stocks-table.component.html',
  styleUrls: ['./stocks-table.component.css']
})

export class StocksTableComponent {

    private branches  = []; 
    private stocks = [];

    private branchesObservable : Observable<object> ; 
    private stocksObservable : Observable<object> ; 

    private dataSource = null;
    private displayedColumns = ['number', 'due_date', 'loss_type', 'status'];

    constructor(private stocksService: StocksService){
        this.branchesObservable = this.stocksService.get_branches();
    }

    getBranchStocks(value){
        this.stocksObservable = this.stocksService.get_stocks(value);
        this.dataSource = new StockDataSource(this.stocksService);
    }

}

export class StockDataSource extends DataSource<any> {
  constructor(private StocksService: StocksService) {
    super();
  }
  connect(): Observable<Stock[]> {
    return this.StocksService.getStocks();
  }
  disconnect() {}
}


// import { Component, OnInit } from '@angular/core';
// import { StocksService } from '../../services/stocks.service';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/of';
// import { DataSource } from '@angular/cdk/collections';
// import { Stock } from '../../models/stock.model';

// @Component({
//   selector: 'app-stocks-table',
//   templateUrl: './stocks-table.component.html',
//   styleUrls: ['./stocks-table.component.css']
// })
// export class StocksTableComponent implements OnInit {

//   dataSource = null;
//   displayedColumns = ['number', 'due_date', 'loss_type', 'status'];
//   constructor(private StocksService: StocksService) { }
  
//   ngOnInit() {
//   }


//   selectBranch(value){
//     alert(value);
//     this.dataSource = new UserDataSource(this.StocksService);
//   }

// }

// export class UserDataSource extends DataSource<any> {
//   constructor(private StocksService: StocksService) {
//     super();
//   }
//   connect(): Observable<Stock[]> {
//     return this.StocksService.getStocks();
//   }
//   disconnect() {}
// }