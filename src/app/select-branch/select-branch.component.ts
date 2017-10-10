import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-select-branch',
  styleUrls: ['./select-branch.component.css'],
  template: `
  <select class="form-control" (change)="onSelectChange($event)">
      <option value="">--- Select ---</option>
      <option value="Charlotte">Charlotte</option>
      <option value="Chicago">Chicago</option>
      <option value="Dallas">Dallas</option>
  </select>  
  `
})
export class SelectBranchComponent {

  constructor() {}
  ngOnInit() {}  

  //event emitter
  @Output() select = new EventEmitter();

  onSelectChange(event){
    let selectedValue = event.target.value;
    
    this.select.emit(selectedValue);

    // need to reset selectable to false
    // this.markers.forEach(function(marker){
    //   if (marker.selectable) {
    //     marker.selectable = false;
    //   }
    // });
  } 

}
