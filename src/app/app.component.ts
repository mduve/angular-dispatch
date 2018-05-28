import { Component, ViewChild } from '@angular/core';
import { RouterModule, Router }   from '@angular/router';
import { MatSidenav } from '@angular/material';
import { FilterSideNavService } from './services/filter-side-nav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = "Dispatch";

  @ViewChild('filterColumnSidenav') public filterColumnSidenav: MatSidenav;

  constructor(
    public router: Router,
    private filterSideNavService: FilterSideNavService ) { this.route() }

  route(){
    if(this.router.url === '/dispatch'){
        this.title = "Dispatch"
    } else if (this.router.url === '/manage') {
        this.title = "Manage"
    } else if (this.router.url === '/settings') {
        this.title = "Settings"
    }
  }

  ngOnInit(): void {
    this.filterSideNavService.setSidenav(this.filterColumnSidenav);
  }


}
