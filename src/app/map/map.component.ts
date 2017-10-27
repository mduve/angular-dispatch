import { Component, Input, Output, EventEmitter } from '@angular/core';
import { StocksService } from '../stocks.service';

@Component({
  selector: 'app-map',
  //templateUrl: './map.component.html',
  template: `
  <div class="col-xs-6">
    <mat-horizontal-stepper [linear]="isLinear">
      <mat-step [stepControl]="firstFormGroup">
        <ng-template matStepLabel>Select Stocks</ng-template>
        <select id="branchSelector" class="form-control pull-left" (change)="onSelectChange($event)">
          <option value="">--- Select ---</option>
          <option *ngFor="let b of markers; let i = index" [value]="i">{{ b.branch.name }}</option>
        </select> 
        <p><strong>{{ branchName }}</strong> {{ branchAddress }}, stock counter  <span class="badge badge-secondary">{{ count }}</span></p>
        <ol class="stocks" style="list-style-type:none;">
          <li 
            *ngFor="let m of markersFiltered; let i = index" 
            (click)="clickedMarker(m, i);" 
            [ngClass]="m.selectable ? 'selected' : 'unselected'">
              {{m.number}}, lat: {{m.lat}}, long: {{m.lng}}, selected: {{ m.selectable }}
          </li>
        </ol>
        <div>
          <button id="review" mat-button matStepperNext [disabled]="buttonState()">Next</button>
        </div>
      </mat-step>
      <mat-step [stepControl]="secondFormGroup">
        <ng-template matStepLabel>Select Route</ng-template>

        <p><strong>Start</strong> {{ branchAddress }}</p>
        <ol class="stocks" [dragula]='"another-bag"' [dragulaModel]='many' type="A">
          <ng-container *ngFor="let m of markersFiltered; let i = index">
            <li *ngIf="(m.selectable == true)">
              <!-- ({{i + 1}}) -->  {{m.number}}, lat: {{m.lat}}, long: {{m.lng}}
            </li>
          </ng-container>
        </ol>
        <p><strong>Finish</strong> {{ branchAddress }}</p>
        <div>
          <button mat-button matStepperPrevious>Back</button>
          <button mat-button matStepperNext>Next</button>
      </div>

      </mat-step> 
      <mat-step><ng-template matStepLabel>Review</ng-template></mat-step>
    </mat-horizontal-stepper>
  </div>
  <div class="col-xs-6">
    <agm-map 
      [latitude]="lat" 
      [longitude]="lng"
      [zoom]="zoom"
      [disableDefaultUI]=false
      [zoomControl]="false"
      [styles]="styles">
      <agm-marker 
        *ngFor="let m of markersFiltered; let i = index" 
        (markerClick)="clickedMarker(m, i);" 
        [latitude]="m.lat" 
        [longitude]="m.lng" 
        [iconUrl]="m.selectable ? '../assets/pin-selected.png' : '../assets/pin-unselected.png'"  
        >
      </agm-marker>

      <agm-marker [latitude]="branchLat" [longitude]="branchLng" [iconUrl]="'../assets/branch.png'"></agm-marker>

    </agm-map>
  </div>
  `,
  styleUrls: ['./map.component.css', '../../.././node_modules/dragula/dist/dragula.css'],
})

export class MapComponent {

  zoom: number = 4;
  lat: number = 40;
  lng: number = -100;  
  count: number = 0;
  styles: object = [{"elementType":"geometry","stylers":[{"color":"#f5f5f5"}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#f5f5f5"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text.fill","stylers":[{"color":"#bdbdbd"}]},{"featureType":"administrative.neighborhood","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#eeeeee"}]},{"featureType":"poi","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"poi.business","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#e5e5e5"}]},{"featureType":"poi.park","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#ffffff"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#dadada"}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"color":"#e5e5e5"}]},{"featureType":"transit.station","elementType":"geometry","stylers":[{"color":"#eeeeee"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#c9c9c9"}]},{"featureType":"water","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]}];

  markers: any = [];
  branchAddress: string;
  branchName: string;
  branchLat: number;
  branchLng: number;  

  //service
  constructor(private stocksService: StocksService) {}
  ngOnInit() {this.markers = this.stocksService.get()}  


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

  // selected branch stocks
  markersFiltered:any[] = [];

  onSelectChange(event){
    let selectedValue = event.target.value;

    this.branchName = this.markers[selectedValue].branch.name;
    this.branchAddress = this.markers[selectedValue].branch.address;
    this.branchLat = this.markers[selectedValue].branch.lat;
    this.branchLng = this.markers[selectedValue].branch.lng;
    this.lat = this.markers[selectedValue].branch.lat;
    this.lng = this.markers[selectedValue].branch.lng;
    this.zoom = this.markers[selectedValue].branch.zoom;
    this.markersFiltered = this.markers[selectedValue]["stocks"];


    this.markers[selectedValue]["stocks"].forEach(function(marker){marker.selectable = false;});
    this.count = 0;

    
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