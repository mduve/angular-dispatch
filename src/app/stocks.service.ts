import { Injectable } from '@angular/core';

@Injectable()
export class StocksService {

  constructor() { }

  get() {
    return this.markers;
  }  

  markers = [
    { branch: 'charlotte', number: 'stock-0123455-charlotte', due_date: '09/20/2017 12:04 PM', loss_type: 'collision', status: 'Wait Dispatch', pickup_location: 'Kelley McNight Wrecker Service', zip_code: '76011', county: 'Tarrant', city: 'Arlington', state: 'TX', model_year: 2003, model_make: 'Dodge', model_name: 'RAM 1500', priority: 'V', salvage_provider: 'State Farm Insurance', lat: 41.679570, lng: -88.365600, draggable: false, selectable: false },
    { branch: 'charlotte', number: 'stock-0123456-charlotte', due_date: '09/20/2017 12:04 PM', loss_type: 'collision', status: 'Wait Dispatch', pickup_location: 'Kelley McNight Wrecker Service', zip_code: '76011', county: 'Tarrant', city: 'Arlington', state: 'TX', model_year: 2003, model_make: 'Dodge', model_name: 'RAM 1500', priority: 'V', salvage_provider: 'State Farm Insurance', lat: 42.620576, lng: -89.168607, draggable: false, selectable: false },
    { branch: 'chicago', number: 'stock-0123457-chicago', lat: 45.669576, lng: -87.265607, draggable: false, selectable: false },
    { branch: 'dallas', number: 'stock-0123458-dallas', lat: 40.679576, lng: -90.365607, draggable: false, selectable: false }
  ];



}

//https://angular.io/guide/http#!#extract-data
//https://stackoverflow.com/questions/42299585/get-json-content-google-maps-angular2
//https://www.lynda.com/AngularJS-tutorials/Using-service-components/540347/553420-4.html