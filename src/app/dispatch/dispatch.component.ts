import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dispatch',
  templateUrl: './dispatch.component.html',
  styleUrls: ['./dispatch.component.css'], 
  template: `
		<div class="container-fluid">
			<div class="row">				
				<div class="col-xs-12"><h5>Dispatch <p class="float-right">stock counter</p></h5></div>
				<!--<div class="col-xs-6"><app-select-branch (emitEvent)="selectedBranch($event)"></app-select-branch></div>
				<div class="col-xs-6"><app-map [data]="test"></app-map></div>-->
				<div class="col-xs-6"><app-select-branch></app-select-branch></div>
				<div class="col-xs-6"><app-map></app-map></div>

			</div>
		</div>
  `
})
export class DispatchComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


}
