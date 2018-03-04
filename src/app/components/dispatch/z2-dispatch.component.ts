import { Component, ViewChildren, QueryList } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

//Services
//import { FirecloudService } from '../../services/firecloud.service';


@Component({
  selector: 'app-dispatch',
  templateUrl: './dispatch.component.html',
  styleUrls: ['./dispatch.component.css']
})
export class DispatchComponent {

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


    //ngx-datagrid
    rows;
    columns;
    selected = [];
    allStocks = [];

    isChecked: boolean;
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
      } else {
        this.allStocks[index].isChecked = false;
      }

      // console.log(row);
      // console.log(index);
      // console.log(this.myCheckboxes);
      // this.myCheckboxes.forEach(cbInstance => console.log(cbInstance));
      // console.log(this.myCheckboxes.toArray());
      // console.log(this.myCheckboxes.map(cbInstance => cbInstance));

      /////////////////////////////////

      // for (var i = 0; i < this.myCheckboxes.length; i++) {
      //   if (this.myCheckboxes[i].isChecked){
      //     console.log('is checked');
      //   } else {
      //     console.log('is unchecked');
      //   }
      // }

      //let cbarray = this.myCheckboxes.forEach(function(element) {
        // if(element.checked){
        //   console.log('checked' + ' ' + index);
        //   //console.log(unsel[index]);
        // } else {
        //   console.log('unchecked' + ' ' + index);          
        // }
      //});

      // let cbarray = this.myCheckboxes.toArray();
      // if (!cbarray[index].isChecked){
      //   this.allStocks[index].isChecked = true;
      // } else {
      //   this.allStocks[index].isChecked = false;
      // }
      // console.log(cbarray);
    }

    selAllCheckboxes(sel){
      this.allStocks.forEach(function(marked){
        if (sel) {
          marked.isChecked = false;
        } else {
          marked.isChecked = true;
        }
      });
    }

    selMarker(stock, index){
      //console.log();

      let cbarray = this.myCheckboxes.map(cbInstance => cbInstance);
      if (stock.isChecked){
        cbarray[index].checked = false;
        this.allStocks[index].isChecked = false;
      } else {
        cbarray[index].checked = true;
        this.allStocks[index].isChecked = true;
      }


    }

    test(rowIndex){
      //console.log(rowIndex);
    };
    onSelect({ selected }) {
      //console.log('Select Event this.selected  ===>   ', this.selected);
    }
    onActivate(event) { 
      //console.log('Activate Event', event);
    }

    ngAfterViewInit(){      
    }


}
