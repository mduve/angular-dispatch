// import { Component, Input, Output, EventEmitter, OnInit, ChangeDetectorRef } from '@angular/core';
import { Component, OnInit, Input, AfterViewInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataSource } from '@angular/cdk/collections';

import { StocksService } from '../../services/stocks.service';
import { Stock } from '../../models/stock.model';
import { StocksMockService2 } from '../../services/stocks-mock2.service';


import { FormControl, FormBuilder, FormGroup, Validators, FormArray, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/observable/merge';
import { of as observableOf } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators/catchError';
import { map } from 'rxjs/operators/map';
import { startWith } from 'rxjs/operators/startWith';
import { switchMap } from 'rxjs/operators/switchMap';


import { MatCheckbox, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-stocks-table',
  templateUrl: './stocks-table.component.html',
  styleUrls: [
    './stocks-table.component.css', 
    '../../../.././node_modules/dragula/dist/dragula.css'
  ],
})



export class StocksTableComponent implements OnInit {

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

    //select stocks
    stocksUnSelected:any;
    stocksSelected:any;

    isChecked: boolean;

    @ViewChild('myCheckbox') private myCheckbox: MatCheckbox;



    constructor(
      private stocksService: StocksService,
      private stocksMockService2: StocksMockService2,
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

      //for the map/marker selections - not for data table
      this.stocksObservable.subscribe(data=>this.stocksUnSelected=data);
      //for the table selections - not for data table
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
      //reset stocks
      this.stocksSelected = [];
      this.stocksUnSelected = []; 
    }

    //agm-map
    selectStockMarker(stock, index:number){
        //1 
        if (stock.isChecked) {stock.isChecked = false;} else {stock.isChecked = true;}
        //2
        let stocksArray = this.stocksSelected.map(function (arrayItem) {return arrayItem.number;});
        let indexOfSelectedStock = stocksArray.indexOf(stock.number);


        if (stock.isChecked) { 
          this.stocksUnSelected[indexOfSelectedStock].isChecked = true;
          this.stocksSelected[indexOfSelectedStock].isChecked = true;
        } else {
          this.stocksUnSelected[indexOfSelectedStock].isChecked = false;
          this.stocksSelected[indexOfSelectedStock].isChecked = false;
        }

        // myCheckbox currently faulty
        // if (stock.isChecked) { 
        //   this.myCheckbox.checked = true;
        // } else {
        //   this.myCheckbox.checked = false;
        // }

        const selectedStocks = <FormArray>this.firstFormGroup.get('firstCtrl') as FormArray;
        if (stock.isChecked) {
          selectedStocks.push(new FormControl(stock.isChecked));
          console.log('is checked');
        } else {
          const i = selectedStocks.controls.findIndex(x => x.value === stock.selectable);
          selectedStocks.removeAt(i);
          console.log('is not checked');
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

    //mat-table 2!
    displayedColumns2 = ['select', 'number', 'due_date', 'loss_type', 'status'];
    dataSource2 = new MatTableDataSource<Stock>(STOCK_DATA);
    selection = new SelectionModel<Stock>(true, []);

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource2.data.length;
      return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
      this.isAllSelected() ?
          this.selection.clear() :
          this.dataSource2.data.forEach(row => this.selection.select(row));
    }

    ngAfterViewInit() {
      this.dataSource2.paginator = this.paginator;
      this.dataSource2.sort = this.sort;
    }


}

//mat-datatable 1
export class StockDataSource extends DataSource<any> {
  constructor(private StocksService: StocksService) {
    super();
  }
  connect(): Observable<Stock[]> {
    return this.StocksService.getStocks();
  }
  disconnect() {}
}

//For mat-datatable 2
const STOCK_DATA: Stock[] = []

// const STOCK_DATA: Stock[] = [
//   {branchId:1,id:1,number:'0123455',due_date:'09/20/2017 12:04 PM',loss_type:'collision',status:'Wait Dispatch',pickup_location:'Paw Creek',zip_code:'28214',county:'Mecklenburg',city:'Charlotte',state:'NC',model_year:2003,model_make:'Dodge',model_name:'RAM 1500',priority:'V',salvage_provider:'State Farm Insurance',provider_name:'',towable:true,damage:'RWD/Theft',stock_address:'8600-8690 Stoneface Rd',tower:'A & R Towing',storage_end:'09/22/2017',total_payment_amount:'0.00',total_hauling_amount:'0.00',payment_type:'',checks_payable_to:'',dispatch_note:'lorem ipsum',destination:'charlotte',tow_zone:'20',mileage:'4326',tow_type:'Off site Pickup Tow',lat:35.268542,lng:-80.949685,draggable:false,selectable:false},
//   {branchId:1,id:2,number:'0123456',due_date:'09/21/2017 4:35 PM',loss_type:'water',status:'Wait Dispatch',pickup_location:'Paw Creek',zip_code:'28269',county:'Mecklenburg',city:'Charlotte',state:'NC',model_year:2010,model_make:'Honda',model_name:'Civic',priority:'V',salvage_provider:'Farmers Insurance',provider_name:'',towable:false,damage:'RWD/Theft',stock_address:'7103 Toxaway Ln',tower:'A & R Towing',storage_end:'09/22/2017',total_payment_amount:'0.00',total_hauling_amount:'0.00',payment_type:'',checks_payable_to:'',dispatch_note:'lorem ipsum',destination:'charlotte',tow_zone:'20',mileage:'4326',tow_type:'Off site Pickup Tow',lat:35.328003,lng:-80.796323,draggable:false,selectable:false},
//   {branchId:1,id:3,number:'0123457',due_date:'09/21/2017 4:35 PM',loss_type:'water',status:'Wait Dispatch',pickup_location:'Paw Creek',zip_code:'28031',county:'Mecklenburg',city:'Cornelius',state:'NC',model_year:2010,model_make:'Honda',model_name:'Civic',priority:'V',salvage_provider:'Farmers Insurance',provider_name:'',towable:false,damage:'Water',stock_address:'11692-12050 State Rd 2416',tower:'A & R Towing',storage_end:'09/22/2017',total_payment_amount:'0.00',total_hauling_amount:'0.00',payment_type:'',checks_payable_to:'',dispatch_note:'lorem ipsum',destination:'charlotte',tow_zone:'20',mileage:'4326',tow_type:'Off site Pickup Tow',lat:35.470419,lng:-80.836749,draggable:false,selectable:false},
//   {branchId:1,id:4,number:'0123458',due_date:'09/18/2017 3:33 PM',loss_type:'water',status:'Wait Dispatch',pickup_location:'Paw Creek',zip_code:'28031',county:'Mecklenburg',city:'Charlotte',state:'NC',model_year:2008,model_make:'Nissan',model_name:'Rouge',priority:'',salvage_provider:'Farmers Insurance',provider_name:'',towable:true,damage:'Water',stock_address:'3100 Park Rd',tower:'A & R Towing',storage_end:'09/22/2017',total_payment_amount:'0.00',total_hauling_amount:'0.00',payment_type:'',checks_payable_to:'',dispatch_note:'lorem ipsum',destination:'charlotte',tow_zone:'20',mileage:'4326',tow_type:'Off site Pickup Tow',lat:35.188192,lng:-80.853276,draggable:false,selectable:false},
//   {branchId:1,id:5,number:'0123532',due_date:'09/17/2017 8:15 PM',loss_type:'water',status:'Wait Dispatch',pickup_location:'Paw Creek',zip_code:'28205',county:'Mecklenburg',city:'Charlotte',state:'NC',model_year:2008,model_make:'Nissan',model_name:'Rouge',priority:'',salvage_provider:'Farmers Insurance',provider_name:'',towable:true,damage:'Water',stock_address:'1722 Matheson Ave',tower:'A & R Towing',storage_end:'09/22/2017',total_payment_amount:'0.00',total_hauling_amount:'0.00',payment_type:'',checks_payable_to:'',dispatch_note:'lorem ipsum',destination:'charlotte',tow_zone:'20',mileage:'4326',tow_type:'Off site Pickup Tow',lat:35.234280,lng:-80.796191,draggable:false,selectable:false},
//   {branchId:2,id:1,number:'0123458',due_date:'09/20/2017 12:04 PM',loss_type:'theft',status:'Wait Off Site Tow Dispatch',pickup_location:'Columbus',zip_code:'28206',county:'Tarrant',city:'Arlington',state:'TX',model_year:2003,model_make:'Dodge',model_name:'RAM 1500',priority:'V',salvage_provider:'State Farm Insurance',provider_name:'',towable:true,damage:'Water',stock_address:'1722 Matheson Ave',tower:'A & R Towing',lat:41.912387,lng:-87.740211,draggable:false,selectable:false},
//   {branchId:2,id:2,number:'0123459',lat:41.792706,lng:-87.975795,draggable:false,selectable:false},
//   {branchId:2,id:3,number:'0123460',lat:41.731548,lng:-87.676077,draggable:false,selectable:false},
//   {branchId:3,id:1,number:'0123461',lat:32.837662,lng:-96.853799,draggable:false,selectable:false},
//   {branchId:3,id:2,number:'0123462',lat:32.923006,lng:-96.774148,draggable:false,selectable:false},
//   {id:3,branchId:3,number:'0123463',lat:32.761475,lng:-96.855172,draggable:false,selectable:false},
// ];



//need test to see if remote data works
//const STOCK_DATA: Stock[] = this.StocksService.getStocks();
//need test to see if local data works
//const STOCK_DATA: Stock[] = this.StocksMockService2.get();



