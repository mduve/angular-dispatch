import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dispatch',
  templateUrl: './dispatch.component.html',
  styleUrls: ['./dispatch.component.css'], 
})
export class DispatchComponent implements OnInit {

  constructor() { }
  ngOnInit() {}

  selectedBranch;
  countedStocks = 0;

  selectBranch(data){this.selectedBranch = data;this.countedStocks = 0}
  stockCounter(stockCount){this.countedStocks = stockCount;}


}
