import { Component, ViewChildren, QueryList } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-dispatch6',
  templateUrl: './dispatch6.component.html',
  styleUrls: ['./dispatch6.component.css']
})
export class Dispatch6Component {

	//agm-map
	styles: object = [{"elementType":"geometry","stylers":[{"color":"#f5f5f5"}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#f5f5f5"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text.fill","stylers":[{"color":"#bdbdbd"}]},{"featureType":"administrative.neighborhood","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#eeeeee"}]},{"featureType":"poi","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"poi.business","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#e5e5e5"}]},{"featureType":"poi.park","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#ffffff"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#dadada"}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"color":"#e5e5e5"}]},{"featureType":"transit.station","elementType":"geometry","stylers":[{"color":"#eeeeee"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#c9c9c9"}]},{"featureType":"water","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]}];
	lat: number = 40;
	lng: number = -100;  
	zoom: number = 10;
	//agm-map - Branch specific  
	branchName: string = JSON.parse(window.localStorage.getItem('branchname'));
	branchId: number = JSON.parse(window.localStorage.getItem('branchid'));
	branchAddress: string = JSON.parse(window.localStorage.getItem('branchaddress'));
	branchLat: number = JSON.parse(window.localStorage.getItem('branchlat'));
	branchLng: number  = JSON.parse(window.localStorage.getItem('branchlng'));

  //ngx-grid
	rows;
	columns;
  selected = [];
  allStocks = [];

  isChecked: boolean = false;
  allCheckboxesSelected:boolean = false;
  @ViewChildren("myCheckbox") private myCheckboxes : QueryList<any>;


	constructor(private afs: AngularFirestore) {

      //remove later
      if (this.branchName == null) {
        if (window.confirm('Please select a Branch')) {
          window.location.href='http://localhost:4200/settings';
        };
      }
      this.getData(this.branchId);

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
      if (cbarray[index].checked){
        this.allStocks[index].isChecked = true;
        //.... need to replace with toggleSelCheckboxesAll()
        let totalchecked = this.myCheckboxes.filter(cbInstance => cbInstance.checked);
        if (totalchecked.length == this.allStocks.length) {this.allCheckboxesSelected = true;}
        //.... assign checked stocks to selected array
        this.selected = this.myCheckboxes.filter(cbInstance => cbInstance.checked);        
      } else {
        this.allStocks[index].isChecked = false;
        //... need to replace with toggleSelCheckboxesAll()
        this.allCheckboxesSelected = false;
        //.... assign checked stocks to selected array
        this.selected = this.myCheckboxes.filter(cbInstance => cbInstance.checked);
      }      
    }	

    selMarker(stock, index){
      let cbarray = this.myCheckboxes.map(cbInstance => cbInstance);

      if (stock.isChecked){
        cbarray[index].checked = false;
        this.allStocks[index].isChecked = false;
        //... need to replace with toggleSelCheckboxesAll()
        this.allCheckboxesSelected = false;
        //.... assign checked stocks to selected array
        this.selected = this.myCheckboxes.filter(cbInstance => cbInstance.checked);
      } else {
        cbarray[index].checked = true;
        this.allStocks[index].isChecked = true;
        //.... need to replace with toggleSelCheckboxesAll()
        let totalchecked = this.myCheckboxes.filter(cbInstance => cbInstance.checked);
        if (totalchecked.length == this.allStocks.length) {this.allCheckboxesSelected = true;}
        //.... assign checked stocks to selected array
        this.selected = this.myCheckboxes.filter(cbInstance => cbInstance.checked);
      }
    }

	// onSelect({ selected }) {
	// 	this.selected.splice(0, this.selected.length);
	// 	this.selected.push(...selected);
	// }

	// onActivate(event) {
	// }

    selCheckboxesAll(allCheckboxesSelected){

      //toggle state of checkboxes and map markers
      if (allCheckboxesSelected) {
        this.allStocks.forEach(function(marked){marked.isChecked = true;});
        this.myCheckboxes.forEach(function(selected){selected.checked = true;});
        //.... assign checked stocks to selected array
        this.selected = this.myCheckboxes.filter(cbInstance => cbInstance.checked);
      } else {
        this.allStocks.forEach(function(marked){marked.isChecked = false;});
        this.myCheckboxes.forEach(function(selected){selected.checked = false;});
        //.... assign checked stocks to selected array
        this.selected = this.myCheckboxes.filter(cbInstance => cbInstance.checked);
      }
      //toggle state of select all checkbox
      if (this.allCheckboxesSelected) {
        this.allCheckboxesSelected = false;
      } else {
        this.allCheckboxesSelected = true;
      }


    }



}
