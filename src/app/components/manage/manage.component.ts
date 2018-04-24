import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';


@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  batchcollection: AngularFirestoreCollection<any> = this.afs.collection('batches');
  batchobs = this.batchcollection.valueChanges();

  batches

  constructor(
    private afs: AngularFirestore,
  ) {
    this.afs.collection('batches').valueChanges().subscribe((batches) => {
      this.batches = batches;
    })
  }

  ngOnInit() {  }

}
