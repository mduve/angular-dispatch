import { Component } from '@angular/core';
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
    unselected = [];

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

        //console.log(stocks);
        this.unselected.push(...stocks);
      })
    }

    test(rowIndex){
      console.log(rowIndex);

    };
    onSelect({ selected }) {
      //console.log(this.selected.splice(0, this.selected.length);)
      // NEED INDEX and retrieve object
      //if (selected == false ) {} else {} 

      console.log('Select Event this.selected  ===>   ', this.selected);

      // find the index of the selected object so I can splice it from my unselected array
      //https://www.google.com/search?q=compare+two+arrays+to+find+index&oq=compare+two+arrays+to+find+index&aqs=chrome..69i57.11136j0j4&sourceid=chrome&ie=UTF-8
      //https://stackoverflow.com/questions/29113362/how-to-compare-two-arrays-and-then-return-the-index-of-the-difference
      // function arrayDiff(a, b) {
      //     return a.filter(function(i) {
      //         if (b.indexOf(i) < 0) {
      //             diffIndexes.push(a.indexOf(i));
      //             return true;
      //         } else {
      //             return false;
      //         }
      //     });
      // };
      // var diffIndexes = [];
      // var diffValues = arrayDiff(this.unselected, this.selected);
      // this.unselected = diffValues;

      // this.unselected.map((currElement, index) => {
      //   console.log(currElement.number + ', ' + index + ', ');
      // });


    }
    onActivate(event) { //console.log('Activate Event', event);
    }

    //selectStockMarker(stock, index){this.selected.push(stock);}
}
