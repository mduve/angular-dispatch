import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dispatch',
  templateUrl: './dispatch.component.html',
  styleUrls: ['./dispatch.component.css']
})
export class DispatchComponent implements OnInit {

  branchName;


  constructor() {

  }

  ngOnInit() {

    //branch selection
    let storageValue = window.localStorage.getItem('name');
    this.branchName = JSON.parse(storageValue);
    if (storageValue == null) {
      if (window.confirm('Please select a Branch')) {
        window.location.href='http://localhost:4200/settings';
      };
    }

  }
}
