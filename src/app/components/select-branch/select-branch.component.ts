import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-select-branch',
  templateUrl: './select-branch.component.html',
  styleUrls: ['./select-branch.component.css'],
})
export class SelectBranchComponent {

  constructor() {}
  ngOnInit() {}  

  //event emitter
  @Output() select = new EventEmitter();

  onSelectChange(event){
    let selectedValue = event.target.value;
    this.select.emit(selectedValue);
  } 

}
