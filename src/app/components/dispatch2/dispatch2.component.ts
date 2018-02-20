import {Component, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';

/**
 * @title Data table with sorting, pagination, and filtering.
 */

@Component({
  selector: 'app-dispatch2',
  templateUrl: './dispatch2.component.html',
  styleUrls: ['./dispatch2.component.css']
})
export class Dispatch2Component {

  displayedColumns = ['select', 'number', 'due_date', 'loss_type', 'status'];
  dataSource = new MatTableDataSource(STOCK_DATA);
  selection = new SelectionModel<Stock>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {
  }

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

}
export interface Stock {
    number?:string;
    due_date?:string; 
    loss_type?:string;
    status?:string;
}

const STOCK_DATA: Stock[] = [
  {number:'0123454',due_date:'09/20/2017 12:04 PM',loss_type:'collision',status:'Wait Dispatch'},
  {number:'0123455',due_date:'09/21/2017 4:35 PM',loss_type:'water',status:'Wait Dispatch'},
  {number:'0123456',due_date:'09/21/2017 4:35 PM',loss_type:'water',status:'Wait Dispatch'},
  {number:'0123457',due_date:'08/18/2017 3:33 PM',loss_type:'water',status:'Wait Dispatch'},
  {number:'0123532',due_date:'09/17/2017 8:15 PM',loss_type:'water',status:'Wait Dispatch'},
  {number:'0123458',due_date:'09/20/2017 12:04 PM',loss_type:'theft',status:'Wait Off Site Tow Dispatch'},
  {number:'0123459',due_date:'10/05/2017 3:33 PM',loss_type:'theft',status:'Wait Off Site Tow Dispatch'},
  {number:'0123460',due_date:'09/18/2017 2:15 PM',loss_type:'theft',status:'Wait Dispatch'},
  {number:'0123461',due_date:'09/15/2017 3:33 PM',loss_type:'water',status:'Wait Dispatch'},
  {number:'0123462',due_date:'10/18/2017 3:33 PM',loss_type:'collision',status:'Wait Off Site Tow Dispatch'},
  {number:'0123463',due_date:'07/18/2017 3:33 PM',loss_type:'collision',status:'Wait Off Site Tow Dispatch'},
]; 

// export interface Stock {
//     id?: number;
//     branchId?: number;

//     branch?:string;
//     number?:string;
//     due_date?:string; 
//     loss_type?:string;
//     status?:string;
//     pickup_location?:string;
//     zip_code?:string;
//     county?:string;
//     city?:string;
//     state?:string;
//     model_year?:number;
//     model_make?:string;
//     model_name?:string;
//     priority?:string;
//     salvage_provider?:string;

//     provider_name?:string;
//     towable?:boolean;
//     damage?:string;
//     stock_address?:string;
//     tower?:string;

//     storage_end?:string; 
//     total_payment_amount?:number;
//     total_hauling_amount?:number;
//     payment_type?:string;
//     checks_payable_to?:string;
//     dispatch_note?:string;
//     destination?:string;
//     tow_zone?:number;
//     mileage?:string;
//     tow_type?:string;

//     lat: number;
//     lng: number;
//     draggable:boolean;
//     selectable:boolean;
//     address:string;
// }

// const STOCK_DATA: Stock[] = [
//   {branchId:1,id:1,number:'0123454',due_date:'09/20/2017 12:04 PM',loss_type:'collision',status:'Wait Dispatch',pickup_location:'Paw Creek',zip_code:'28214',county:'Mecklenburg',city:'Charlotte',state:'NC',model_year:2003,model_make:'Dodge',model_name:'RAM 1500',priority:'V',salvage_provider:'State Farm Insurance',provider_name:'',towable:true,damage:'RWD/Theft',stock_address:'8600-8690 Stoneface Rd',tower:'A & R Towing',storage_end:'09/22/2017',total_payment_amount:'0.00',total_hauling_amount:'0.00',payment_type:'',checks_payable_to:'',dispatch_note:'lorem ipsum',destination:'charlotte',tow_zone:'20',mileage:'4326',tow_type:'Off site Pickup Tow',lat:35.268542,lng:-80.949685,draggable:false,selectable:false},
//   {branchId:1,id:2,number:'0123455',due_date:'09/21/2017 4:35 PM',loss_type:'water',status:'Wait Dispatch',pickup_location:'Paw Creek',zip_code:'28269',county:'Mecklenburg',city:'Charlotte',state:'NC',model_year:2010,model_make:'Honda',model_name:'Civic',priority:'V',salvage_provider:'Farmers Insurance',provider_name:'',towable:false,damage:'RWD/Theft',stock_address:'7103 Toxaway Ln',tower:'A & R Towing',storage_end:'09/22/2017',total_payment_amount:'0.00',total_hauling_amount:'0.00',payment_type:'',checks_payable_to:'',dispatch_note:'lorem ipsum',destination:'charlotte',tow_zone:'20',mileage:'4326',tow_type:'Off site Pickup Tow',lat:35.328003,lng:-80.796323,draggable:false,selectable:false},
//   {branchId:1,id:3,number:'0123456',due_date:'09/21/2017 4:35 PM',loss_type:'water',status:'Wait Dispatch',pickup_location:'Paw Creek',zip_code:'28031',county:'Mecklenburg',city:'Cornelius',state:'NC',model_year:2010,model_make:'Honda',model_name:'Civic',priority:'V',salvage_provider:'Farmers Insurance',provider_name:'',towable:false,damage:'Water',stock_address:'11692-12050 State Rd 2416',tower:'A & R Towing',storage_end:'09/22/2017',total_payment_amount:'0.00',total_hauling_amount:'0.00',payment_type:'',checks_payable_to:'',dispatch_note:'lorem ipsum',destination:'charlotte',tow_zone:'20',mileage:'4326',tow_type:'Off site Pickup Tow',lat:35.470419,lng:-80.836749,draggable:false,selectable:false},
//   {branchId:1,id:4,number:'0123457',due_date:'08/18/2017 3:33 PM',loss_type:'water',status:'Wait Dispatch',pickup_location:'Paw Creek',zip_code:'28031',county:'Mecklenburg',city:'Charlotte',state:'NC',model_year:2008,model_make:'Nissan',model_name:'Rouge',priority:'',salvage_provider:'Farmers Insurance',provider_name:'',towable:true,damage:'Water',stock_address:'3100 Park Rd',tower:'A & R Towing',storage_end:'09/22/2017',total_payment_amount:'0.00',total_hauling_amount:'0.00',payment_type:'',checks_payable_to:'',dispatch_note:'lorem ipsum',destination:'charlotte',tow_zone:'20',mileage:'4326',tow_type:'Off site Pickup Tow',lat:35.188192,lng:-80.853276,draggable:false,selectable:false},
//   {branchId:1,id:5,number:'0123532',due_date:'09/17/2017 8:15 PM',loss_type:'water',status:'Wait Dispatch',pickup_location:'Paw Creek',zip_code:'28205',county:'Mecklenburg',city:'Charlotte',state:'NC',model_year:2008,model_make:'Nissan',model_name:'Rouge',priority:'',salvage_provider:'Farmers Insurance',provider_name:'',towable:true,damage:'Water',stock_address:'1722 Matheson Ave',tower:'A & R Towing',storage_end:'09/22/2017',total_payment_amount:'0.00',total_hauling_amount:'0.00',payment_type:'',checks_payable_to:'',dispatch_note:'lorem ipsum',destination:'charlotte',tow_zone:'20',mileage:'4326',tow_type:'Off site Pickup Tow',lat:35.234280,lng:-80.796191,draggable:false,selectable:false},
//   {branchId:2,id:1,number:'0123458',due_date:'09/20/2017 12:04 PM',loss_type:'theft',status:'Wait Off Site Tow Dispatch',pickup_location:'Columbus',zip_code:'28206',county:'Tarrant',city:'Arlington',state:'TX',model_year:2003,model_make:'Dodge',model_name:'RAM 1500',priority:'V',salvage_provider:'State Farm Insurance',provider_name:'',towable:true,damage:'Water',stock_address:'1722 Matheson Ave',tower:'A & R Towing',lat:41.912387,lng:-87.740211,draggable:false,selectable:false},
//   {branchId:2,id:2,number:'0123459',due_date:'10/05/2017 3:33 PM',loss_type:'theft',status:'Wait Off Site Tow Dispatch',lat:41.792706,lng:-87.975795,draggable:false,selectable:false},
//   {branchId:2,id:3,number:'0123460',due_date:'09/18/2017 2:15 PM',loss_type:'theft',status:'Wait Dispatch',lat:41.731548,lng:-87.676077,draggable:false,selectable:false},
//   {branchId:3,id:1,number:'0123461',due_date:'09/15/2017 3:33 PM',loss_type:'water',status:'Wait Dispatch',lat:32.837662,lng:-96.853799,draggable:false,selectable:false},
//   {branchId:3,id:2,number:'0123462',due_date:'10/18/2017 3:33 PM',loss_type:'collision',status:'Wait Off Site Tow Dispatch',lat:32.923006,lng:-96.774148,draggable:false,selectable:false},
//   {branchId:3,id:3,number:'0123463',due_date:'07/18/2017 3:33 PM',loss_type:'collision',status:'Wait Off Site Tow Dispatch',lat:32.761475,lng:-96.855172,draggable:false,selectable:false},
// ]; 

