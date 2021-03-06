// import { Component, Input, Output, EventEmitter, OnInit, ChangeDetectorRef } from '@angular/core';
import { Component, OnInit, Input, ViewChildren, QueryList } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataSource } from '@angular/cdk/collections';
import { StocksService } from '../../services/stocks.service';

import { Stock } from '../../models/stock.model';

import { FormControl, FormBuilder, FormGroup, Validators, FormArray, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

import { MatCheckbox } from '@angular/material';

@Component({
  selector: 'app-stocks-table',
  templateUrl: './stocks-table.component.html',
  styleUrls: [
    './stocks-table.component.css',
    '../../../.././node_modules/dragula/dist/dragula.css'
  ],
})



export class StocksTableComponent implements OnInit {

    title = "Stocks Table"

    //agm-map
    styles: object = [{"elementType":"geometry","stylers":[{"color":"#f5f5f5"}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#f5f5f5"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text.fill","stylers":[{"color":"#bdbdbd"}]},{"featureType":"administrative.neighborhood","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#eeeeee"}]},{"featureType":"poi","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"poi.business","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#e5e5e5"}]},{"featureType":"poi.park","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#ffffff"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#dadada"}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"color":"#e5e5e5"}]},{"featureType":"transit.station","elementType":"geometry","stylers":[{"color":"#eeeeee"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#c9c9c9"}]},{"featureType":"water","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]}];
    zoom: number = 4;
    lat: number = 40;
    lng: number = -100;
    branchAddress: string;
    branchName: string;
    branchLat: number = NaN;
    branchLng: number = NaN;

    //services
    branchesObservable : Observable<object> ;
    stocksObservable : Observable<object> ;
    //mat-datatable
    dataSource = null;
    displayedColumns = ['number', 'due_date', 'loss_type', 'status'];
    //mat-autocomplete
    branches: any = [];
    branchCtrl: FormControl = new FormControl();
    filteredBranches: Observable<any[]>;
    //mat-stepper
    isLinear = true;
    firstFormGroup: FormGroup;

    //select/unselect stocks
    stocksUnSelected:any;
    stocksSelected:any;

    isChecked: boolean;
    @ViewChildren('myCheckbox') private myCheckboxes : QueryList<any>;




    constructor(
      private stocksService: StocksService,
      private _formBuilder: FormBuilder,
    ) {  }

    ngOnInit() {
      //load branches for mat-autocomplete
      this.branches = this.stocksService.get_branches();
      this.filteredBranches = this.branchCtrl.valueChanges
        .startWith(null)
        .map(b => b && typeof b === 'object' ? b.name : b)
        .switchMap(val => {
          return this.filterBranches(val || '')
        });
      this.validateStepper();
    }

    //mat-stepper : set/reset
    validateStepper(){
        this.firstFormGroup = this._formBuilder.group({
          firstCtrl: this._formBuilder.array([])},
          { validator:this.checkIfChecked }
        );
    }

    //mat-autocomplete
    displayFn(b): string {
      return b ? b.name : b;
    }
    filterBranches(val: string) {
      return this.branches.map(response => response.filter(option => {
          return option.name.toLowerCase().indexOf(val.toLowerCase()) === 0
        }));
    }

    //fetch stock data into table
    getBranchStocks(value){
      this.stocksObservable = this.stocksService.get_stocks(value.branchId);
      this.dataSource = new StockDataSource(this.stocksService);
      //for the map/marker selections
      this.stocksObservable.subscribe(data=>this.stocksUnSelected=data);
      //for the table selections
      this.stocksObservable.subscribe(data=>this.stocksSelected=data);

      //Map data
      this.lat = value.lat;
      this.lng = value.lng;
      this.zoom = value.zoom;
      //Map data (branch)
      this.branchName = value.name;
      this.branchAddress = value.address;
      this.branchLat = value.lat;
      this.branchLng = value.lng;

      //reset validator
      this.validateStepper();
      //reset selected/unselected stocks array
      this.stocksSelected = [];
      this.stocksUnSelected = [];
    }

    //agm-map
    selectStockMarker(stock, index:number){
        //1 set initial values
        if (stock.isChecked) {stock.isChecked = false;} else {stock.isChecked = true;}
        //2 map selected stocks array
        let stocksArray = this.stocksSelected.map(function (arrayItem) {return arrayItem.number;});
        let indexOfSelectedStock = stocksArray.indexOf(stock.number);
        //3 set up local variable to array
        let myCheckboxes = this.myCheckboxes.toArray();
        //4 set mat-stepper validation
        const selectedStocks = <FormArray>this.firstFormGroup.get('firstCtrl') as FormArray;


        if (stock.isChecked) {
          //2 mark selected or unselected in mapped arrays
          this.stocksUnSelected[indexOfSelectedStock].isChecked = true;
          this.stocksSelected[indexOfSelectedStock].isChecked = true;
          //3 mark local variable
          myCheckboxes[index].checked = true;
          //4 mat-stepper validation
          selectedStocks.push(new FormControl(stock.isChecked));
        } else {
          //2 mark selected or unselected in mapped arrays
          this.stocksUnSelected[indexOfSelectedStock].isChecked = false;
          this.stocksSelected[indexOfSelectedStock].isChecked = false;
          //3 mark local variable
          myCheckboxes[index].checked = false;
          //4 mat-stepper validation
          const i = selectedStocks.controls.findIndex(x => x.value === stock.selectable);
          selectedStocks.removeAt(i);
        }

    }

    //mat-stepper
    checkIfChecked = (control: AbstractControl) => {
      if(control['controls'].firstCtrl.length == 0) {
        return {notValid:true}
      } else {
        return null;
      }
    }


}

//mat-datatable
export class StockDataSource extends DataSource<any> {
  constructor(private StocksService: StocksService) {
    super();
  }
  connect(): Observable<Stock[]> {
    return this.StocksService.getStocks();
  }
  disconnect() {}
}
