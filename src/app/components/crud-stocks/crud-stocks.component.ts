import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@Component({
  selector: 'app-crud-stocks',
  templateUrl: './crud-stocks.component.html',
  styleUrls: ['./crud-stocks.component.css']
})
export class CrudStocksComponent {
 
  sbranchId: number = 4;
  schecks_payable_to: string = null;
  scity: string = "Brentwood";
  scounty: string = "Williamson";
  sdamage: string = "Theft";
  sdestination: string = "Nashville";
  sdispatch_note: string = "lorem ipsum";
  sdraggable: boolean = false;
  sdue_date: string = "12/14/2017";
  slat: number = 36.027906;
  slng: number = -86.774185;
  sloss_type: string = null;
  smileage: number = 999999;
  smodel_make: string = "Dodge";
  smodel_name: string = "Magnum";
  smodel_year: number = 1978;
  snumber: number = 123000;
  spayment_type: string = null;
  spickup_location: string = null;
  spriority: string = "VIC";
  sprovider_name: string = "Geico";
  ssalvage_provider: string = "";
  sstate: string = "TN";
  sstatus: string = "Wait Dispatch";
  sstock_address: string = null;
  sstorage_end: string = null;
  stotal_hauling_amount: number = null;
  stotal_payment_amount: number = null;
  stow_type: string = null;
  stow_zone: number = null;
  stowable: boolean = null;
  stower: string = null;
  szip_code: string = "37027";



  stockcollection: AngularFirestoreCollection<any> = this.afs.collection('stocks');
  stockobs = this.stockcollection.valueChanges();
 
  constructor(private afs: AngularFirestore) {}
 
  add(){
    this.stockcollection.add({

      branchId: this.sbranchId,
      checks_payable_to: this.schecks_payable_to,
      city: this.scity,
      county: this.scounty,
      damage: this.sdamage,
      destination: this.sdestination,
      dispatch_note: this.sdispatch_note,
      draggable: this.sdraggable,
      due_date: this.sdue_date,
      lat: this.slat,
      lng: this.slng,
      loss_type: this.sloss_type,
      mileage: this.smileage,
      model_make: this.smodel_make,
      model_name: this.smodel_name,
      model_year: this.smodel_year,
      number: this.snumber,
      payment_type: this.spayment_type,
      pickup_location: this.spickup_location,
      priority: this.spriority,
      provider_name: this.sprovider_name,
      salvage_provider: this.ssalvage_provider,
      state: this.sstate,
      status: this.sstatus,
      stock_address: this.sstock_address,
      storage_end: this.sstorage_end,
      total_hauling_amount: this.stotal_hauling_amount,
      total_payment_amount: this.stotal_payment_amount,
      tow_type: this.stow_type,
      tow_zone: this.stow_zone,
      towable: this.stowable,
      tower: this.stower,
      zip_code: this.szip_code,

    }).then((docRef) => {
      this.stockcollection.doc(docRef.id).update({
        stockid: docRef.id
      })
    })
    .catch((err) => {
      console.log(err);
    })
  }

  update(stock) {
    this.stockcollection.doc(stock.stockid).update({
      status: 'Wait Driver'
    }).then(() => {
      console.log('updated');
    })
  }
 
  delete(stock) {
    this.stockcollection.doc(stock.stockid).delete().then(() => {
      console.log('deleted');
    })
  }
  
}

// import { Component } from '@angular/core';
// import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

// @Component({
//   selector: 'app-crud-stocks',
//   templateUrl: './crud-stocks.component.html',
//   styleUrls: ['./crud-stocks.component.css']
// })
// export class CrudStocksComponent {
 
//   prodname: string;
//   proddesc: string;
//   prodcollection: AngularFirestoreCollection<any> = this.afs.collection('products');
//   prodobs = this.prodcollection.valueChanges();
 
//   constructor(private afs: AngularFirestore) {}
 
//   add(){
//     this.prodcollection.add({
//       productname: this.prodname,
//       productdesc: this.proddesc
//     }).then((docRef) => {
//       this.prodcollection.doc(docRef.id).update({
//         prodid: docRef.id
//       })
//     })
//     .catch((err) => {
//       console.log(err);
//     })
//   }

//   update(prod) {
//     this.prodcollection.doc(prod.prodid).update({
//       productname: 'newprodname'
//     }).then(() => {
//       console.log('updated');
//     })
//   }
 
//   delete(prod) {
//     this.prodcollection.doc(prod.prodid).delete().then(() => {
//       console.log('deleted');
//     })
//   }
  
// }