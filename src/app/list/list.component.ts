import { Component, OnInit } from '@angular/core';
import { StocksService } from '../stocks.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css', '../../.././node_modules/dragula/dist/dragula.css'],
  providers: [StocksService]

})

export class ListComponent implements OnInit  {

  // .. service
  // constructor(private _stocksService: StocksService) {}
  // ngOnInit() {this.title = this._stocksService.SomeMethod();}  

  ngOnInit() {}

  //need to move to service
  markers = [
    { branch: 'charlotte', number: 'stock-0123455-charlotte', due_date: '09/20/2017 12:04 PM', loss_type: 'collision', status: 'Wait Dispatch', pickup_location: 'Kelley McNight Wrecker Service', zip_code: '76011', county: 'Tarrant', city: 'Arlington', state: 'TX', model_year: 2003, model_make: 'Dodge', model_name: 'RAM 1500', priority: 'V', salvage_provider: 'State Farm Insurance', lat: 41.679570, lng: -88.365600, draggable: false, selectable: false },
    { branch: 'charlotte', number: 'stock-0123456-charlotte', due_date: '09/20/2017 12:04 PM', loss_type: 'collision', status: 'Wait Dispatch', pickup_location: 'Kelley McNight Wrecker Service', zip_code: '76011', county: 'Tarrant', city: 'Arlington', state: 'TX', model_year: 2003, model_make: 'Dodge', model_name: 'RAM 1500', priority: 'V', salvage_provider: 'State Farm Insurance', lat: 42.620576, lng: -89.168607, draggable: false, selectable: false },
    { branch: 'chicago', number: 'stock-0123457-chicago', lat: 45.669576, lng: -87.265607, draggable: false, selectable: false },
    { branch: 'dallas', number: 'stock-0123458-dallas', lat: 40.679576, lng: -90.365607, draggable: false, selectable: false }
  ];


  // need to select branches
  changeFilterData:any[] = [];


  // initialize title, zoom, start position and styles
  title:string = 'Dispatch Listing';
  zoom: number = 5;
  lat: number = 41.699566;
  lng: number = -88.065607;  
  styles: object = [{"elementType":"geometry","stylers":[{"color":"#f5f5f5"}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#f5f5f5"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text.fill","stylers":[{"color":"#bdbdbd"}]},{"featureType":"administrative.neighborhood","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#eeeeee"}]},{"featureType":"poi","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"poi.business","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#e5e5e5"}]},{"featureType":"poi.park","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#ffffff"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#dadada"}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"color":"#e5e5e5"}]},{"featureType":"transit.station","elementType":"geometry","stylers":[{"color":"#eeeeee"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#c9c9c9"}]},{"featureType":"water","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]}];


  selectedStocks() {
      var count = 0;
      this.markers.forEach(function(marker){
          count += marker.selectable ? 1 : 0;
      });
      return count; }

  buttonState(){
      var count = 0;
      this.markers.forEach(function(marker){
          count += marker.selectable ? 1 : 0;
      });
      if(count > 0){
        return false;
      } else {
        return true;
      }}

  clickedMarker(marker:marker, index:number){
    if (marker.selectable) {
      marker.selectable = false;
    } else {
      marker.selectable = true;
    }}

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

interface marker {
    branch?:string;
    number?:string;
    due_date?:string;
    loss_type?:string;
    status?:string;
    pickup_location?:string;
    zip_code?:string;
    county?:string;
    city?:string;
    state?:string;
    model_year?:number;
    model_make?:string;
    model_name?:string;
    priority?:string;
    salvage_provider?:string;

    lat: number;
    lng: number;
    draggable:boolean;
    selectable:boolean;
}
