import { Component, ViewChildren, QueryList } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

import { FormControl, FormBuilder, FormGroup, Validators, FormArray, AbstractControl } from '@angular/forms';


@Component({
  selector: 'app-dispatch6',
  templateUrl: './dispatch6.component.html',
  styleUrls: ['./dispatch6.component.css']
})
export class Dispatch6Component {

  title = "Dispatch Tow 6"

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
	columns;
  //application
  selected = [];
  allStocks = [];
  isChecked: boolean = false;
  allCheckboxesSelected:boolean = false;
  @ViewChildren("myCheckbox") private myCheckboxes : QueryList<any>;
  //mat-stepper
  isLinear = true;
  firstFormGroup: FormGroup;

	constructor(
    private afs: AngularFirestore,
    private _formBuilder: FormBuilder
  ) { this.getData(this.branchId);}


  ngOnInit() {
    this.validateStepper();


  }

  //mat-stepper : set/reset
  validateStepper(){
      this.firstFormGroup = this._formBuilder.group({
        firstCtrl: this._formBuilder.array([])},
        { validator:this.checkIfChecked }
      );
  }
  //mat-stepper
  checkIfChecked = (control: AbstractControl) => {
    if(control['controls'].firstCtrl.length == 0) {
      return {notValid:true}
    } else {
      return null;
    }
  }

  getData(branchdata) {
    this.afs.collection('stocks', ref => ref.where("branchId", "==", branchdata)).valueChanges().subscribe((stocks) => {
      this.rows = stocks;
      //create unselected map markers
      this.allStocks.push(...stocks);
      this.allStocks.map(function(newprop) {
        newprop.isChecked = false;
        return newprop;
      });
    });
  }

  selCheckbox(index){
    let cbarray = this.myCheckboxes.map(cbInstance => cbInstance);
    //set mat-stepper validation
    const validate = <FormArray>this.firstFormGroup.get('firstCtrl') as FormArray;
    if (cbarray[index].checked){
      this.allStocks[index].isChecked = true;
      //.... toggle selectAll Checkbox //need to replace with toggleSelCheckboxesAll()
      let totalchecked = this.myCheckboxes.filter(cbInstance => cbInstance.checked);
      if (totalchecked.length == this.allStocks.length) {this.allCheckboxesSelected = true;}
      // 2 assign checked stocks to selected array
      this.selected = this.allStocks.filter(instance => instance.isChecked);
      // 3 mat-stepper validation
      validate.push(new FormControl(this.selected));
    } else {
      this.allStocks[index].isChecked = false;
      //.... toggle selectAll Checkbox //need to replace with toggleSelCheckboxesAll()
      this.allCheckboxesSelected = false;
      // 2 assign checked stocks to selected array
      this.selected = this.allStocks.filter(instance => instance.isChecked);
      // 3 mat-stepper validation
      const i = validate.controls.findIndex(x => x.value === this.selected);
      validate.removeAt(i);
    }
  }

  selMarker(stock, index){
    let cbarray = this.myCheckboxes.map(cbInstance => cbInstance);
    //set mat-stepper validation
    const validate = <FormArray>this.firstFormGroup.get('firstCtrl') as FormArray;

    if (stock.isChecked){
      cbarray[index].checked = false;
      this.allStocks[index].isChecked = false;
      //.... toggle selectAll Checkbox //need to replace with toggleSelCheckboxesAll()
      this.allCheckboxesSelected = false;
      // 2 assign checked stocks to selected array
      this.selected = this.allStocks.filter(instance => instance.isChecked);
      // 3 mat-stepper validation
      const i = validate.controls.findIndex(x => x.value === this.selected);
      validate.removeAt(i);
    } else {
      cbarray[index].checked = true;
      this.allStocks[index].isChecked = true;
      //.... toggle selectAll Checkbox //need to replace with toggleSelCheckboxesAll()
      let totalchecked = this.myCheckboxes.filter(cbInstance => cbInstance.checked);
      if (totalchecked.length == this.allStocks.length) {this.allCheckboxesSelected = true;}
      // 2 assign checked stocks to selected array for shits and giggles
      this.selected = this.allStocks.filter(instance => instance.isChecked);
      // 3 mat-stepper validation
      validate.push(new FormControl(this.selected));
    }
  }


  selCheckboxesAll(allCheckboxesSelected){
    //set mat-stepper validation
    const validate = <FormArray>this.firstFormGroup.get('firstCtrl') as FormArray;
    //toggle state of checkboxes and map markers
    if (allCheckboxesSelected) {
      // 1 default
      this.allStocks.forEach(function(marked){marked.isChecked = true;});
      this.myCheckboxes.forEach(function(selected){selected.checked = true;});
      // 2 assign checked stocks to selected array for shits and giggles
      this.selected = this.allStocks.filter(instance => instance.isChecked);
      // 3 mat-stepper validation
      this.allStocks.forEach(function(marked){validate.removeAt(marked);});
      this.selected.forEach(function(marked){validate.push(new FormControl(marked));});
    } else {
      // 1 default
      this.allStocks.forEach(function(marked){marked.isChecked = false;});
      this.myCheckboxes.forEach(function(selected){selected.checked = false;});
      // 2 assign checked stocks to selected array for shits and giggles
      this.selected = this.allStocks.filter(instance => instance.isChecked);
      // 3 mat-stepper validation
      this.allStocks.forEach(function(marked){validate.removeAt(marked);});
    }
    //toggle state of select all checkbox
    if (this.allCheckboxesSelected) {
      this.allCheckboxesSelected = false;
    } else {
      this.allCheckboxesSelected = true;
    }
  }



}
