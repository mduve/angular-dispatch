import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dispatch',
  //templateUrl: './dispatch.component.html',
  template: `
	<div class="container-fluid">
		<div class="row">				
			<div class="col-xs-12"><h5>Dispatch</h5></div>
		</div>
		<div class="row">
			<app-map style="width:100%;"></app-map>
		</div>
	</div>
  `,
  styleUrls: ['./dispatch.component.css'], 
})
export class DispatchComponent implements OnInit {

  constructor() { }
  ngOnInit() {}

  // selectedBranch;
  // selectBranch(data){this.selectedBranch = data;this.countedStocks = 0}

  // countedStocks = 0;
  // stockCounter(stockCount){this.countedStocks = stockCount;}


}
