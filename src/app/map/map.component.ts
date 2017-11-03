import { Component, Input, Output, EventEmitter } from '@angular/core';
import { StocksService } from '../stocks.service';

import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css', '../../.././node_modules/dragula/dist/dragula.css'],
})

export class MapComponent {

  styles: object = [{"elementType":"geometry","stylers":[{"color":"#f5f5f5"}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#f5f5f5"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text.fill","stylers":[{"color":"#bdbdbd"}]},{"featureType":"administrative.neighborhood","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#eeeeee"}]},{"featureType":"poi","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"poi.business","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#e5e5e5"}]},{"featureType":"poi.park","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#ffffff"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#dadada"}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"color":"#e5e5e5"}]},{"featureType":"transit.station","elementType":"geometry","stylers":[{"color":"#eeeeee"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#c9c9c9"}]},{"featureType":"water","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]}];

  zoom: number = 4;
  lat: number = 40;
  lng: number = -100;  
  count: number = 0;

  branchAddress: string;
  branchName: string;
  branchLat: number;
  branchLng: number;  

  markers: any = [];
  markersFiltered:any[] = [];

  myControl: FormControl = new FormControl();
  filteredOptions: Observable<string[]>;
  selectedBranch:string = '';

  constructor(private stocksService: StocksService) {}

  ngOnInit() {
    this.markers = this.stocksService.get();
    this.filteredOptions = this.myControl.valueChanges
      .startWith(null)
      .map(b => b && typeof b === 'object' ? b.name : b)
      .map(val => val ? this.filter(val) : this.markers.slice());

  }

  clickedMarker(marker:marker, index:number){
    if (marker.selectable) {
      marker.selectable = false;
    } else {
      marker.selectable = true;
    }
    this.count += marker.selectable ? 1 : -1;    
  }

  buttonState(){
    if(this.count > 0){
      return false;
    } else {
      return true;
    }
  }

  filter(val: string): string[] {
    return this.markers.filter(marker => marker.branch.name.toLowerCase().indexOf(val.toLowerCase()) === 0);
  } 

  displayFn(b): string {
    return b ? b.branch.name : b;
  }


  selectBranch(index){
    this.branchName = index.branch.name;
    this.branchAddress = index.branch.address;
    this.branchLat = index.branch.lat;
    this.branchLng = index.branch.lng;
    this.lat = index.branch.lat;
    this.lng = index.branch.lng;
    this.zoom = index.branch.zoom;
    this.markersFiltered = index.stocks;
    this.count = 0;

    index.stocks.forEach(function(marker){marker.selectable = false;});
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
    address:string;

}