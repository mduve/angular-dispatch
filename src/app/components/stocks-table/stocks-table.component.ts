import { Component, OnInit } from '@angular/core';
import { StocksService } from '../../services/stocks.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { DataSource } from '@angular/cdk/collections';
import { Stock } from '../../models/stock.model';

@Component({
  selector: 'app-stocks-table',
  templateUrl: './stocks-table.component.html',
  styleUrls: ['./stocks-table.component.css']
})
export class StocksTableComponent implements OnInit {

  dataSource = null;
  displayedColumns = ['number', 'due_date', 'loss_type', 'status'];
  constructor(private StocksService: StocksService) { }
  
  ngOnInit() {
  }


  selectBranch(value){
    alert(value);
    this.dataSource = new UserDataSource(this.StocksService);
  }

}

export class UserDataSource extends DataSource<any> {
  constructor(private StocksService: StocksService) {
    super();
  }
  connect(): Observable<Stock[]> {
    return this.StocksService.getStocks();
  }
  disconnect() {}
}