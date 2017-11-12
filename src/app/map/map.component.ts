import { Component, Input, Output, EventEmitter } from '@angular/core';
import { StocksService } from '../stocks.service';

import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-map',
  // templateUrl: './map.component.html',
  template: `
    <mat-horizontal-stepper [linear]="isLinear">
      <mat-step [stepControl]="firstFormGroup">
        <ng-template matStepLabel>Select &amp; Route Stocks</ng-template>

        <form [formGroup]="firstFormGroup">

          <div class="col-xs-6">
              <mat-tab-group>
                <mat-tab label="Select Stocks">

                  <mat-form-field>
                    <input type="text" placeholder="Pick a Branch" aria-label="Pick a Branch" matInput [formControl]="myControl" [matAutocomplete]="auto">
                    <mat-autocomplete #auto="matAutocomplete" name="Branch" (optionSelected)="selectBranch($event.option.value)" [displayWith]="displayFn">
                      <mat-option *ngFor="let marker of filteredOptions | async;" [value]="marker">
                          {{ marker.branch.name }} 
                      </mat-option>
                    </mat-autocomplete>
                  </mat-form-field>

                  <!-- orig
                  <ol class="stocks" style="list-style-type:none;">
                    <li *ngFor="let m of markersFiltered; let i = index" (click)="clickedMarker(m, i);" [ngClass]="m.selectable ? 'selected' : 'unselected'" >
                        <mat-checkbox></mat-checkbox> ({{i + 1}}) <a href="">{{ m.number }}</a> {{ m.due_date }}, {{ m.number }}, {{ m.loss_type }}, {{ m.status }}, {{ m.pickup_location }}, {{ m.zip_code }}, {{ m.county }}, {{ m.city }}, {{ m.state }}, {{ m.model_year }}, {{ m.model_make }}, {{ m.model_name }}, {{ m.priority }}, {{ m.salvage_provider }} 
                    </li>
                  </ol> -->

                  <ol class="stocks">
                    <li *ngFor="let m of markersFiltered; let i = index" >
                        <mat-checkbox (check)="checkedMarker()"></mat-checkbox> <a href="">{{ m.number }}</a> {{ m.due_date }}, {{ m.number }}, {{ m.loss_type }}, {{ m.status }}, {{ m.pickup_location }}, {{ m.zip_code }}, {{ m.county }}, {{ m.city }}, {{ m.state }}, {{ m.model_year }}, {{ m.model_make }}, {{ m.model_name }}, {{ m.priority }}, {{ m.salvage_provider }} 
                    </li>
                  </ol>  

                  <!-- <p><strong>{{ branchName }}</strong> <span class="badge badge-secondary">{{ count }}</span></p> -->
                  <!-- <mat-form-field><input matInput placeholder="Last name, First name" formControlName="firstCtrl" required></mat-form-field> -->
                  <mat-checkbox formControlName="firstCtrl" required>Validate the first step</mat-checkbox>

                </mat-tab>
                <mat-tab label="Route Stocks">
                  <p><strong>Start</strong> {{ branchAddress }}</p>
                  <ol class="stocks" [dragula]='"another-bag"' [dragulaModel]='many'>
                    <ng-container *ngFor="let m of markersFiltered; let i = index">
                      <li *ngIf="(m.selectable == true)">
                        <!-- ({{i + 1}}) -->  
                        <a href="">{{m.number}}</a> 
                        {{m.stock_address}}, {{m.model_year}}, {{m.model_make}}, {{m.model_name}}, {{m.provider_name}}, {{m.towable}}, {{m.tower}}, {{m.damage}}, {{m.status}} 
                      </li>
                    </ng-container>
                  </ol>
                  <p><strong>Finish</strong> {{ branchAddress }}</p>
                </mat-tab>
              </mat-tab-group>
          </div>
          <div class="col-xs-6">
              <agm-map 
                [latitude]="lat" 
                [longitude]="lng"
                [zoom]="zoom"
                [disableDefaultUI]=false
                [zoomControl]="true"
                [styles]="styles">

                <agm-marker 
                  *ngFor="let m of markersFiltered; let i = index" 
                  (markerClick)="clickedMarker(m, i);" 
                  [latitude]="m.lat" 
                  [longitude]="m.lng" 
                  [iconUrl]="m.selectable ? '../assets/pin-selected.png' : '../assets/pin-unselected.png'"  
                  >
                </agm-marker>

                <agm-marker 
                  [latitude]="branchLat" 
                  [longitude]="branchLng" 
                  [iconUrl]="'../assets/branch.png'">
                </agm-marker>

                 <agm-circle 
                  [latitude]="branchLat" 
                  [longitude]="branchLng" 
                  [radius]="50000"
                  [fillColor]="'red'"
                  [circleDraggable]="false"
                  [editable]="false">
                </agm-circle>

              </agm-map>
          </div>

          <div class="col-xs-12">
            <!-- <button id="review" mat-button matStepperNext [disabled]="buttonState()">Next</button> -->
            <button mat-button matStepperNext>Next</button>
          </div>
        </form>
      </mat-step>

      <mat-step>
        <ng-template matStepLabel>Review</ng-template>
        <div class="col-xs-12">
          <ol class="stocks">
            <ng-container *ngFor="let m of markersFiltered; let i = index">
              <li *ngIf="(m.selectable == true)">
                <!-- ({{i + 1}}) -->  
                <a href="">{{m.number}}</a>  
                {{m.storage_end}} 
                {{m.total_payment_amount}} 
                {{m.total_hauling_amount}} 
                {{m.payment_type}} 
                {{m.checks_payable_to}} 
                {{m.dispatch_note}} 
                {{m.destination}} 
                {{m.tow_zone}} 
                {{m.mileage}} 
                {{m.tow_type}}
   
              </li>
            </ng-container>
          </ol>
        </div>
        <div class="col-xs-12">
          <button disabled>Cancel Dispatch</button>
          <button disabled>logout Tower</button>
          <button disabled>Dispatch</button>
        </div>
  
      </mat-step>

    </mat-horizontal-stepper>

  `,
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
  branchLat: number = NaN;
  branchLng: number = NaN;  

  markers: any = [];
  markersFiltered:any[] = [];

  myControl: FormControl = new FormControl();
  filteredOptions: Observable<string[]>;
  selectedBranch:string = '';

  isLinear = true;
  isCompleted = false;
  firstFormGroup: FormGroup;

  constructor(private stocksService: StocksService, private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.markers = this.stocksService.get();
    this.filteredOptions = this.myControl.valueChanges
      .startWith(null)
      .map(b => b && typeof b === 'object' ? b.name : b)
      .map(val => val ? this.filter(val) : this.markers.slice());

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
  }

  clickedMarker(marker:marker, index:number){
    if (marker.selectable) {
      marker.selectable = false;
    } else {
      marker.selectable = true;
    }
    this.count += marker.selectable ? 1 : -1;    

    if(this.count > 0){
      //alert('more than 1');
      //form completed
      this.isCompleted = true;

    } else {
      //alert('0');
      //form incomplete
      this.isCompleted = false;
    }

  }

  checkedMarker(){
    alert('tst');
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

    provider_name?:string;
    towable?:boolean;
    damage?:string;
    stock_address?:string;
    tower?:string;

    storage_end?:string;
    total_payment_amount?:string;
    total_hauling_amount?:string;
    payment_type?:string;
    checks_payable_to?:string;
    dispatch_note?:string;
    destination?:string;
    tow_zone?:string;
    mileage?:string;
    tow_type?:string;


    lat: number;
    lng: number;
    draggable:boolean;
    selectable:boolean;
    address:string;

}