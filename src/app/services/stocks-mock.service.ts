import { Injectable } from '@angular/core';

@Injectable()
export class StocksMockService {

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
        zoom: 9,
        address: '1710 Starita Rd, Charlotte, NC 28206'
      }, 
      stocks: [{
        number: '0123455', 
        due_date: '09/20/2017 12:04 PM', 
        loss_type: 'collision', 
        status: 'Wait Dispatch', 
        pickup_location: 'Paw Creek', 
        zip_code: '28214', 
        county: 'Mecklenburg', 
        city: 'Charlotte', 
        state: 'NC', 
        model_year: 2003, 
        model_make: 'Dodge', 
        model_name: 'RAM 1500', 
        priority: 'V', 
        salvage_provider: 'State Farm Insurance', 

        provider_name: '',
        towable: true,
        damage: 'RWD/Theft',
        stock_address: '8600-8690 Stoneface Rd',
        tower: 'A & R Towing',

        storage_end: '09/22/2017',
        total_payment_amount: '0.00',
        total_hauling_amount: '0.00',
        payment_type: '',
        checks_payable_to: '',
        dispatch_note: 'lorem ipsum',
        destination: 'charlotte',
        tow_zone: '20',
        mileage: '4326',
        tow_type: 'Off site Pickup Tow',

        lat: 35.268542, 
        lng: -80.949685, 
        draggable: false, 
        selectable: false
      }, {
        number: '0123456', 
        due_date: '09/21/2017 4:35 PM', 
        loss_type: 'water', 
        status: 'Wait Dispatch', 
        pickup_location: 'Paw Creek', 
        zip_code: '28269', 
        county: 'Mecklenburg', 
        city: 'Charlotte', 
        state: 'NC', 
        model_year: 2010, 
        model_make: 'Honda', 
        model_name: 'Civic', 
        priority: 'V', 
        salvage_provider: 'Farmers Insurance', 

        provider_name: '',
        towable: false,
        damage: 'RWD/Theft',
        stock_address: '7103 Toxaway Ln',
        tower: 'A & R Towing',

        storage_end: '09/22/2017',
        total_payment_amount: '0.00',
        total_hauling_amount: '0.00',
        payment_type: '',
        checks_payable_to: '',
        dispatch_note: 'lorem ipsum',
        destination: 'charlotte',
        tow_zone: '20',
        mileage: '4326',
        tow_type: 'Off site Pickup Tow',

        lat: 35.328003, 
        lng: -80.796323, 
        draggable: false, 
        selectable: false
      },{
        number: '0123457', 
        due_date: '09/21/2017 4:35 PM', 
        loss_type: 'water', 
        status: 'Wait Dispatch', 
        pickup_location: 'Paw Creek', 
        zip_code: '28031', 
        county: 'Mecklenburg', 
        city: 'Cornelius', 
        state: 'NC', 
        model_year: 2010, 
        model_make: 'Honda', 
        model_name: 'Civic', 
        priority: 'V', 
        salvage_provider: 'Farmers Insurance', 

        provider_name: '',
        towable: false,
        damage: 'Water',
        stock_address: '11692-12050 State Rd 2416',
        tower: 'A & R Towing',

        storage_end: '09/22/2017',
        total_payment_amount: '0.00',
        total_hauling_amount: '0.00',
        payment_type: '',
        checks_payable_to: '',
        dispatch_note: 'lorem ipsum',
        destination: 'charlotte',
        tow_zone: '20',
        mileage: '4326',
        tow_type: 'Off site Pickup Tow',

        lat: 35.470419, 
        lng: -80.836749, 
        draggable: false, 
        selectable: false        
      },{
        number: '0123458', 
        due_date: '09/18/2017 3:33 PM', 
        loss_type: 'water', 
        status: 'Wait Dispatch', 
        pickup_location: 'Paw Creek', 
        zip_code: '28031', 
        county: 'Mecklenburg', 
        city: 'Charlotte', 
        state: 'NC', 
        model_year: 2008, 
        model_make: 'Nissan', 
        model_name: 'Rouge', 
        priority: '', 
        salvage_provider: 'Farmers Insurance', 

        provider_name: '',
        towable: true,
        damage: 'Water',
        stock_address: '3100 Park Rd',
        tower: 'A & R Towing',

        storage_end: '09/22/2017',
        total_payment_amount: '0.00',
        total_hauling_amount: '0.00',
        payment_type: '',
        checks_payable_to: '',
        dispatch_note: 'lorem ipsum',
        destination: 'charlotte',
        tow_zone: '20',
        mileage: '4326',
        tow_type: 'Off site Pickup Tow',

        lat: 35.188192, 
        lng: -80.853276, 
        draggable: false, 
        selectable: false        
      },{
        number: '0123532', 
        due_date: '09/17/2017 8:15 PM', 
        loss_type: 'water', 
        status: 'Wait Dispatch', 
        pickup_location: 'Paw Creek', 
        zip_code: '28205', 
        county: 'Mecklenburg', 
        city: 'Charlotte', 
        state: 'NC', 
        model_year: 2008, 
        model_make: 'Nissan', 
        model_name: 'Rouge', 
        priority: '', 
        salvage_provider: 'Farmers Insurance', 

        provider_name: '',
        towable: true,
        damage: 'Water',
        stock_address: '1722 Matheson Ave',
        tower: 'A & R Towing',

        storage_end: '09/22/2017',
        total_payment_amount: '0.00',
        total_hauling_amount: '0.00',
        payment_type: '',
        checks_payable_to: '',
        dispatch_note: 'lorem ipsum',
        destination: 'charlotte',
        tow_zone: '20',
        mileage: '4326',
        tow_type: 'Off site Pickup Tow',

        lat: 35.234280, 
        lng: -80.796191, 
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
        number: '0123458', 
        due_date: '09/20/2017 12:04 PM', 
        loss_type: 'theft', 
        status: 'Wait Off Site Tow Dispatch', 
        pickup_location: 'Columbus', 
        zip_code: '28206', 
        county: 'Tarrant', 
        city: 'Arlington', 
        state: 'TX', 
        model_year: 2003, 
        model_make: 'Dodge', 
        model_name: 'RAM 1500', 
        priority: 'V', 
        salvage_provider: 'State Farm Insurance', 

        provider_name: '',
        towable: true,
        damage: 'Water',
        stock_address: '1722 Matheson Ave',
        tower: 'A & R Towing',

        lat: 41.912387, 
        lng: -87.740211, 
        draggable: false, 
        selectable: false
      }, {
        number: '0123459', 
        lat: 41.792706, 
        lng: -87.975795, 
        draggable: false, 
        selectable: false
      },{
        number: '0123460', 
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
        number: '0123461', 
        lat: 32.837662, 
        lng: -96.853799, 
        draggable: false, 
        selectable: false
      }, {
        number: '0123462', 
        lat: 32.923006, 
        lng: -96.774148, 
        draggable: false, 
        selectable: false
      }, {
        number: '0123463', 
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