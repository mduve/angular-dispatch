import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { StocksService } from '../stocks.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css', '../../.././node_modules/dragula/dist/dragula.css'],
})
export class MapComponent implements OnChanges {

  // initialize title, zoom, start position and styles
  zoom: number = 4;
  lat: number = 40;
  lng: number = -100;  
  styles: object = [{"elementType":"geometry","stylers":[{"color":"#f5f5f5"}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#f5f5f5"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text.fill","stylers":[{"color":"#bdbdbd"}]},{"featureType":"administrative.neighborhood","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#eeeeee"}]},{"featureType":"poi","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"poi.business","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#e5e5e5"}]},{"featureType":"poi.park","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#ffffff"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#dadada"}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"color":"#e5e5e5"}]},{"featureType":"transit.station","elementType":"geometry","stylers":[{"color":"#eeeeee"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#c9c9c9"}]},{"featureType":"water","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]}];
  markers;


  //service
  constructor(private stocksService: StocksService) {}
  ngOnInit() {this.markers = this.stocksService.get();}  

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
    }
  }

  // selected branch stocks
  markersFiltered:any[] = [];
  @Input() branch:string;

  ngOnChanges() {
  
      if ( this.branch === 'Charlotte' ) {
        this.markersFiltered = this.markers.slice(0, 3);
        this.zoom = 10;
        this.lat = 35.227085;
        this.lng = -80.843124;          
      } else if ( this.branch === 'Chicago'){
        this.markersFiltered =  this.markers.slice(3, 6);
        this.zoom = 10;
        this.lat = 41.881832;
        this.lng = -87.623177;
      } else if ( this.branch === 'Dallas'){
        this.markersFiltered =  this.markers.slice(6, 9);
        this.zoom = 10;
        this.lat = 32.7767;
        this.lng = -96.7970;
      } else {
        this.markersFiltered =  [];
      }
      if ( this.branch ) {
        this.markers.forEach(function(marker){marker.selectable = false;});
      }
      
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