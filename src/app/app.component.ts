import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {    
    private branches  = []; 
    private stocks = [];

    private branchesObservable : Observable<any[]> ; 
    private stocksObservable : Observable<any[]> ; 

    constructor(private dataService: DataService){

        this.branchesObservable = this.dataService.get_branches();

    }

    getBranchStocks(value){
    	//alert(value);
        this.stocksObservable = this.dataService.get_stocks(value);
        // this.dataService.get_stocks().subscribe((res : any[])=>{
	       //  console.log(res);
	       //  this.stocks = res;
        // });    	
    }

}

// import { Component } from '@angular/core';
// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent {
//   title = 'app'; 
// }


// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { HttpErrorResponse } from '@angular/common/http';
// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent implements OnInit {
//   title = 'app';
//   results = '';
//   constructor(private http: HttpClient){
//   }
//   ngOnInit(): void {
//   	this.http.get<UserResponse>('http://localhost:3000/stocks')
//   	.subscribe(
//   		data => {
//   			console.log(data);
//   		},
// 	    (err: HttpErrorResponse) => {
// 	    	if (err.error instanceof Error) {
// 	    		console.log("Client-side error occured.");
// 	    	} else {
// 	    		console.log("Server-side error occured.");
// 	    	}
// 	    });
//   	const req = this.http.post('http://jsonplaceholder.typicode.com/posts', {
//   		title: 'foo',
//   		body: 'bar',
//   		userId: 1
//   	})
//   	.subscribe(
//   		res => {
//   			console.log(res);
//   		},
//   		err => {
//   			console.log("Error occured");
//   		});
//   }
// }

// interface UserResponse {
//   login: string;
//   bio: string;
//   company: string;
// }