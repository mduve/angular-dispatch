import { Component, ViewChildren, QueryList } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import { FormControl, FormBuilder, FormGroup, Validators, FormArray, AbstractControl } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { MatStepper } from '@angular/material';
import { DragulaService } from 'ng2-dragula/ng2-dragula';



@Component({
  selector: 'app-dispatch',
  templateUrl: './dispatch.component.html',
  styleUrls: ['./dispatch.component.css', 
    '../../../.././node_modules/dragula/dist/dragula.css']
})
export class DispatchComponent {


  //agm-map
  styles: object = [{"elementType":"geometry","stylers":[{"color":"#f5f5f5"}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#f5f5f5"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text.fill","stylers":[{"color":"#bdbdbd"}]},{"featureType":"administrative.neighborhood","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#eeeeee"}]},{"featureType":"poi","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"poi.business","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#e5e5e5"}]},{"featureType":"poi.park","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#ffffff"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#dadada"}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"color":"#e5e5e5"}]},{"featureType":"transit.station","elementType":"geometry","stylers":[{"color":"#eeeeee"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#c9c9c9"}]},{"featureType":"water","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]}];
  lat: number = 40;
  lng: number = -100;  
  zoom: number = 10;
  branchName: string = JSON.parse(window.localStorage.getItem('branchname'));
  branchId: number = JSON.parse(window.localStorage.getItem('branchid'));
  branchAddress: string = JSON.parse(window.localStorage.getItem('branchaddress'));
  branchLat: number = JSON.parse(window.localStorage.getItem('branchlat'));
  branchLng: number  = JSON.parse(window.localStorage.getItem('branchlng'));
  //ngx-grid
  rows;
  columns = [{ name: 'Pickup Location' },{ name: 'Zip' },{ name: 'County' },{ name: 'Priority' },{ name: 'Salvage Provider' },];
  allColumns = [{ name: 'Loss type' },{ name: 'Status' },{ name: 'Pickup Location' },{ name: 'Zip' },{ name: 'County' },{ name: 'City' },{ name: 'State' },{ name: 'Model Year' },{ name: 'Model Make' },{ name: 'Model Name' },{ name: 'Priority' },{ name: 'Salvage Provider' }];
  columns2 = [{ prop: 'number', name: 'Number' }];
  rows2;
  //ngx-grid -- selection arrays
  allRowsSelectedMod; //select all/none states
  selected = []; //ngx grid selected array
  allStocks = []; //custom array to denote all stocks
  selAllStocks = []; //custom array to denote stocks that are selected from allStocks 
  //mat-stepper
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  validated;
  //toggle map
  toggle:boolean = false;
  buttonName:any = 'explore';

  drivers = [{value: 'tow-0', viewValue: 'Joes Towing'},{value: 'tow-1', viewValue: 'Mikes Towing'},{value: 'tow-2', viewValue: 'Johns Towing'}];

  stockcollection: AngularFirestoreCollection<any> = this.afs.collection('stocks');
  stockobs = this.stockcollection.valueChanges();


  constructor(
    private afs: AngularFirestore,
    private _formBuilder: FormBuilder,
    private dragulaService: DragulaService
  ) { 
    this.getData(this.branchId);

    dragulaService.drop.subscribe((value) => {
      console.log('drop happened');
      this.rows2 = [...this.selected];
    });

  }



  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: this._formBuilder.array([])}, 
      { validator:this.checkIfChecked }
    );
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  // get stock data from branch selector
  getData(branchdata) {
    this.afs.collection('stocks', ref => ref.where("branchId", "==", branchdata).where("status", "==", "Wait Dispatch")).valueChanges().subscribe((stocks) => {
      this.rows = stocks;
      this.allStocks.push(...stocks);
    })
  }

  //mat-stepper
  checkIfChecked = (control: AbstractControl) => {
    if(control['controls'].firstCtrl.length == 0) {
      return {notValid:true}
    } else {
      return null;
    }    
  }  


  //toggle map states
  toggleMap() {
    this.toggle = !this.toggle;
    if(this.toggle) this.buttonName = "list"; else this.buttonName = "explore";
  }



  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
    this.selAllStocks = this.selected;

    if (this.selected.length == 0){
      this.selAllStocks.length = 0;
    }
    this.allRowsSelectedListener();
    this.reviewStocksTable();
    //console.log(this.selected);console.log(this.selAllStocks);
    
  } 

  selMarkerOn(index) {
    this.selAllStocks.push(this.allStocks[index]);   
    this.selected = this.selAllStocks;
    this.rows = [...this.rows];
    this.allRowsSelectedListener();
    this.validationPush();
    this.reviewStocksTable();
    //console.log(this.selected);console.log(this.selAllStocks);
  }

  selMarkerOff(index) {
    if (index > -1) {
        this.selAllStocks.splice(index, 1);
    }
    this.selected = this.selAllStocks;
    this.rows = [...this.rows];
    this.allRowsSelectedListener();
    this.validationRemove();
    this.reviewStocksTable();
    //console.log(this.selected);console.log(this.selAllStocks);
  }

  // listen for when all the rows are selected/deselected
  allRowsSelectedListener() {
    if (this.selected.length == this.allStocks.length){
      this.allRowsSelectedMod = true;
    } else {
      this.allRowsSelectedMod = false;
    }
  }
  // when check all is checked, perform the following function
  selectFnMod(allRowsSelectedMod){      
    if (allRowsSelectedMod) {
      this.selected.length, this.selAllStocks.length = 0;
      this.selected.push(...this.allStocks);
      this.selAllStocks = this.selected;
      this.rows = [...this.rows];
      this.validateAll();
      this.reviewStocksTable();
      //console.log(this.selected);console.log(this.selAllStocks);
    } else {
      this.selected.length, this.selAllStocks.length = 0;
      this.rows = [...this.rows];
      this.validateNone();
      this.reviewStocksTable();
      //console.log(this.selected);console.log(this.selAllStocks);      
    }
    if (this.allRowsSelectedMod) {
      this.allRowsSelectedMod = false;
    } else {
      this.allRowsSelectedMod = true;
    }
  }

  //validate first step
  validationPush(){
    const validate = <FormArray>this.firstFormGroup.get('firstCtrl') as FormArray;
    validate.push(new FormControl(this.selected));    
    // console.log(validate);
  }
  validationRemove(){
    const validate = <FormArray>this.firstFormGroup.get('firstCtrl') as FormArray;
    const i = validate.controls.findIndex(x => x.value === this.selected);
    validate.removeAt(i);
    // console.log(validate);
  }
  validateOnSelect(isSelected){
    if (isSelected){
      this.validationPush();
    } else {
      this.validationRemove();
    }
  };
  validateAll(){
    const validate = <FormArray>this.firstFormGroup.get('firstCtrl') as FormArray;
    this.selected.forEach(function(marked){validate.removeAt(marked)});
    this.selected.forEach(function(marked){validate.push(new FormControl(marked))});
    // console.log(validate);
  }
  validateNone(){
    const validate = <FormArray>this.firstFormGroup.get('firstCtrl') as FormArray;
    this.allStocks.forEach(function(marked){validate.removeAt(marked)});
    // console.log(validate);
  }

  //toggle columns in filters
  togglecol(col) {
    const isChecked = this.isChecked(col);

    if(isChecked) {
      this.columns = this.columns.filter(c => { 
        return c.name !== col.name; 
      });
    } else {
      this.columns = [...this.columns, col];
    }
  }

  isChecked(col) {
    return this.columns.find(c => {
      return c.name === col.name;
    });
  }

  reviewStocksTable(){
    this.rows2 = [...this.selected];
  }

  update() {
    //console.log(this.selected);
    let test = this.stockcollection;
    
    this.selected.forEach(function(happy){
      test.doc(happy.stockid).update({
        status: 'Wait Driver'
      }).then(() => {
        console.log('updated');
      })
    });
  }
  refresh() {
    location.reload();
  }

}
