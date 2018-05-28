import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';


@Component({
  selector: 'app-dspm',
  templateUrl: './dspm.component.html',
  styleUrls: ['./dspm.component.css']
})
export class DspmComponent implements OnInit {

  stockcollection: AngularFirestoreCollection<any> = this.afs.collection('stocks');
  batchcollection: AngularFirestoreCollection<any> = this.afs.collection('batches');
  stockobs = this.stockcollection.valueChanges();
  batchobs = this.batchcollection.valueChanges();

  batches;
  title = "Dispatch Management";
  //selected = 'option2';

  selBatchName: string = "No Batch Found";
  selBatchTower: string = "No Tower Found";

  rows;
  selected = [];
  sumStocks;
  selBatchID;

  branchDetail = true;

  constructor(
    private afs: AngularFirestore,
  ) {
    this.afs.collection('batches').valueChanges().subscribe((batches) => {
      this.batches = batches;
    });
  }

  ngOnInit() {
    //console.log(this);
  }


  batchDet(el){
      this.branchDetail = false;
      console.log(el);
      this.selBatchName = el.batchNumber;
      this.selBatchTower = el.driver;
      this.selBatchID = el.batchid;

      this.afs.collection('stocks', ref => ref.where("batchNumber", "==", el.batchNumber)).valueChanges().subscribe((stocks) => {
        this.rows = stocks;
        this.sumStocks = stocks;
      });
  }

  test(){
    this.branchDetail = true;
  }

  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  submitBatch(){
    let stockCollection = this.stockcollection;
    let batchCollection = this.batchcollection;
    if (this.selected.length == this.sumStocks.length) {
      batchCollection.doc(this.selBatchID).delete()
      this.selBatchName = "No Batch Found";
      this.selBatchTower = "No Tower Found";
    }

    this.selected.forEach(function(el){
      stockCollection.doc(el.stockid).update({
        batchNumber: null,
        status: 'Wait Dispatch',
      })
    });

    this.selected = [];
  }
  
}
