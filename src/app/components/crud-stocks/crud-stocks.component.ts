import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@Component({
  selector: 'app-crud-stocks',
  templateUrl: './crud-stocks.component.html',
  styleUrls: ['./crud-stocks.component.css']
})
export class CrudStocksComponent {
 
  sbranchId: number = 4;
  schecksPayableTo: string = null;
  scity: string = "Brentwood";
  scounty: string = "Williamson";
  sdamage: string = "Theft";
  sdestination: string = "Nashville";
  sdispatchNote: string = "lorem ipsum";
  sdraggable: boolean = false;
  sdueDate: string = "Thu Dec 14 2017 10:15:00 GMT-0600 (CST)";
  slat: number = 36.027906;
  slng: number = -86.774185;
  slossType: string = "Theft";
  smileage: number = 999999;
  smodelMake: string = "Dodge";
  smodelName: string = "Magnum";
  smodelYear: number = 1978;
  snumber: number = 123000;
  spaymentType: string = null;
  spickUpLocation: string = null;
  spriority: string = "VIC";
  sproviderName: string = "Geico";
  ssalvageProvider: string = "State Farm Insurance";
  sstate: string = "TN";
  sstatus: string = "Wait Dispatch";
  sstockAddress: string = null;
  sstorageEnd: string = null;
  stotalHaulingAmount: number = 0.00;
  stotalPaymentAmount: number = 5.00;
  stowType: string = null;
  stowZone: number = null;
  stowable: boolean = null;
  stower: string = null;
  szip: string = "37027";



  stockcollection: AngularFirestoreCollection<any> = this.afs.collection('stocks');
  stockobs = this.stockcollection.valueChanges();
 
  constructor(private afs: AngularFirestore) {}
 
  add(){
    this.stockcollection.add({

      branchId: this.sbranchId,
      checksPayableTo: this.schecksPayableTo,
      city: this.scity,
      county: this.scounty,
      damage: this.sdamage,
      destination: this.sdestination,
      dispatchNote: this.sdispatchNote,
      draggable: this.sdraggable,
      dueDate: this.sdueDate,
      lat: this.slat,
      lng: this.slng,
      lossType: this.slossType,
      mileage: this.smileage,
      modelMake: this.smodelMake,
      modelName: this.smodelName,
      modelYear: this.smodelYear,
      number: this.snumber,
      paymentType: this.spaymentType,
      pickUpLocation: this.spickUpLocation,
      priority: this.spriority,
      providerName: this.sproviderName,
      salvageProvider: this.ssalvageProvider,
      state: this.sstate,
      status: this.sstatus,
      stockAddress: this.sstockAddress,
      storageEnd: this.sstorageEnd,
      totalHaulingAmount: this.stotalHaulingAmount,
      totalPaymentAmount: this.stotalPaymentAmount,
      towType: this.stowType,
      towZone: this.stowZone,
      towable: this.stowable,
      tower: this.stower,
      zip: this.szip,

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
    if (stock.status === 'Wait Dispatch'){
      this.stockcollection.doc(stock.stockid).update({
        status: 'Wait Driver'
      }).then(() => {
        console.log('updated');
      })
    }else{
      this.stockcollection.doc(stock.stockid).update({
        status: 'Wait Dispatch'
      }).then(() => {
        console.log('updated');
      })

    }
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