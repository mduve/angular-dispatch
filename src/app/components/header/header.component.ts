import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  inputs: ['menuName']
})
export class HeaderComponent implements OnInit {

  menuName: string;

  constructor() { }

  ngOnInit() {
  }

  test(this){
    console.log(this);
  }

}
