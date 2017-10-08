import { Injectable } from '@angular/core';

@Injectable()
export class StocksService {

  constructor() { }

	SomeMethod (){
		return 'Hey';
	}


  // _markers = [
  //   { number: 'stock-0123456', due_date: '09/20/2017 12:04 PM', loss_type: 'collision', status: 'Wait Dispatch', pickup_location: 'Kelley McNight Wrecker Service', zip_code: '76011', county: 'Tarrant', city: 'Arlington', state: 'TX', model_year: 2003, model_make: 'Dodge', model_name: 'RAM 1500', priority: 'V', salvage_provider: 'State Farm Insurance', lat: 41.659576, lng: -88.165607, draggable: false, selectable: false },
  //   { number: 'stock-0123457', lat: 41.669576, lng: -88.265607, draggable: false, selectable: false },
  //   { number: 'stock-0123458', lat: 41.679576, lng: -88.365607, draggable: false, selectable: false }
  // ];

}

//https://angular.io/guide/http#!#extract-data
//https://stackoverflow.com/questions/42299585/get-json-content-google-maps-angular2