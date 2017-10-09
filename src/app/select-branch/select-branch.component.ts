import { Component, OnInit } from '@angular/core';
import { StocksService } from '../stocks.service';

@Component({
  selector: 'app-select-branch',
  templateUrl: './select-branch.component.html',
  styleUrls: ['./select-branch.component.css']
})
export class SelectBranchComponent implements OnInit {

  //service
  markers;
  constructor(private stocksService: StocksService) {}
  ngOnInit() {
     this.markers = this.stocksService.get();
   }  


  // need to select branches
  changeFilterData:any[] = [];


  onSelectChange(event){
    let selectedValue = event.target.value;
    
    // You can implement filtering logic depending on the selectedValue
    if(selectedValue == 'Charlotte'){
      this.changeFilterData = this.markers.slice(0, 2);
    }else if(selectedValue == 'Chicago'){
      this.changeFilterData =  this.markers.slice(2, 3);
    }else if(selectedValue == 'Dallas'){
      this.changeFilterData =  this.markers.slice(3, 4);
    }else{
      this.changeFilterData =  [];
    }

    this.markers.forEach(function(marker){
      // need to reset selectable to false
      if (marker.selectable) {
        marker.selectable = false;
      }
    });

  }


}
