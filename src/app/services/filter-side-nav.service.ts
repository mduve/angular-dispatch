import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material';

@Injectable()
export class FilterSideNavService {

  constructor() { }

  private sidenav: MatSidenav;


  public setSidenav(sidenav: MatSidenav) {
    this.sidenav = sidenav;
  }

  public open() {
    return this.sidenav.open();
  }


  public close() {
    return this.sidenav.close();
  }

  public toggle(): void {
    this.sidenav.toggle();
    //console.log(this.columns);
  }

  //app.component
  public columns:any = [{ name: 'Loss type' },{ name: 'Status' },{ name: 'Pickup Location' },{ name: 'Zip' },{ name: 'Priority' },{ name: 'Salvage Provider' }];
  public allColumns = [{ name: 'Loss type' },{ name: 'Status' },{ name: 'Pickup Location' },{ name: 'Zip' },{ name: 'County' },{ name: 'City' },{ name: 'State' },{ name: 'Model Year' },{ name: 'Model Make' },{ name: 'Model Name' },{ name: 'Priority' },{ name: 'Salvage Provider' }];

  public isChecked(col) {
    return this.columns.find(c => {
      return c.name === col.name;
    });
  }

  public togglecol(col) {
    const isChecked = this.isChecked(col);
    if(isChecked) {
      this.columns = this.columns.filter(c => {
        return c.name !== col.name;
      });
    } else {
      this.columns = [...this.columns, col];
    }
  }

  //dsp.component
  public showCheckedCol(checkedCol) {
    this.columns = checkedCol;
  }


}
