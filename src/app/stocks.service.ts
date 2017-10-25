import { Injectable } from '@angular/core';

@Injectable()
export class StocksService {

  constructor() { }

  get() {
    return this.markers;
  }  

  markers = [
    { 
      branch: {
        name:'charlotte',
        lat: 35.277088, 
        lng: -80.818720,
        zoom: 10,
        address: '1710 Starita Rd, Charlotte, NC 28206'
      }, 
      stocks: [{
        number: 'stock-0123455', 
        due_date: '09/20/2017 12:04 PM', 
        loss_type: 'collision', 
        status: 'Wait Dispatch', 
        pickup_location: 'Kelley McNight Wrecker Service', 
        zip_code: '76011', 
        county: 'Tarrant', 
        city: 'Arlington', 
        state: 'TX', 
        model_year: 2003, 
        model_make: 'Dodge', 
        model_name: 'RAM 1500', 
        priority: 'V', 
        salvage_provider: 'State Farm Insurance', 
        lat: 35.253384, 
        lng: -80.870522, 
        draggable: false, 
        selectable: false
      }, {
        number: 'stock-0123456', 
        due_date: '09/20/2017 12:04 PM', 
        loss_type: 'collision', 
        status: 'Wait Dispatch', 
        pickup_location: 'Kelley McNight Wrecker Service', 
        zip_code: '76011', 
        county: 'Tarrant', 
        city: 'Arlington', 
        state: 'TX', 
        model_year: 2003, 
        model_make: 'Dodge', 
        model_name: 'RAM 1500', 
        priority: 'V', 
        salvage_provider: 'State Farm Insurance', 
        lat: 35.248339, 
        lng: -80.835242, 
        draggable: false, 
        selectable: false
      },{
        number: 'stock-0123457', 
        due_date: '09/20/2017 12:04 PM', 
        loss_type: 'collision', 
        status: 'Wait Dispatch', 
        pickup_location: 'Kelley McNight Wrecker Service', 
        zip_code: '76011', 
        county: 'Tarrant', 
        city: 'Arlington', 
        state: 'TX', 
        model_year: 2003, 
        model_make: 'Dodge', 
        model_name: 'RAM 1500', 
        priority: 'V', 
        salvage_provider: 'State Farm Insurance', 
        lat: 35.225379, 
        lng: -80.780121, 
        draggable: false, 
        selectable: false        
      }]
    }, 
    { 
      branch: {
        name:'chicago',
        lat: 41.589395, 
        lng: -87.711607, 
        zoom: 8,
        address: '16425 Crawford Ave, Markham, IL 60428'
      }, 
      stocks: [{
        number: 'stock-0123458', 
        lat: 41.912387, 
        lng: -87.740211, 
        draggable: false, 
        selectable: false
      }, {
        number: 'stock-0123459', 
        lat: 41.792706, 
        lng: -87.975795, 
        draggable: false, 
        selectable: false
      },{
        number: 'stock-0123460', 
        lat: 41.731548, 
        lng: -87.676077, 
        draggable: false, 
        selectable: false
      }]
    }, 
    { 
      branch: {
        name:'dallas',
        lat: 32.5783512, 
        lng: -96.6718283,
        zoom: 8,
        address: '204 Mars Rd, Wilmer, TX 75172'
      }, 
      stocks: [{
        number: 'stock-0123461', 
        lat: 32.837662, 
        lng: -96.853799, 
        draggable: false, 
        selectable: false
      }, {
        number: 'stock-0123462', 
        lat: 32.923006, 
        lng: -96.774148, 
        draggable: false, 
        selectable: false
      }, {
        number: 'stock-0123463', 
        lat: 32.761475, 
        lng: -96.855172, 
        draggable: false, 
        selectable: false
      }]
    },
  ];



}

//https://angular.io/guide/http#!#extract-data
//https://stackoverflow.com/questions/42299585/get-json-content-google-maps-angular2
//https://www.lynda.com/AngularJS-tutorials/Using-service-components/540347/553420-4.html