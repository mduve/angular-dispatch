import { Injectable }   from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient }   from '@angular/common/http';
import { Observable }   from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Stock } from '../models/stock.model';

@Injectable()
export class StocksService {

  //private serviceUrl = 'http://localhost:3000/stocks';
  private serviceUrl = 'http://my-json-server.typicode.com/mduve/services/stocks';

  constructor(private http: HttpClient) { }

  getStocks(): Observable<Stock[]> {
    return this.http.get<Stock[]>(this.serviceUrl)
  }


  //private serviceUrl = 'http://my-json-server.typicode.com/mduve/services/branch/1';
  // works
  //------
  //private serviceUrl = 'http://localhost:3000/stocks';
  //constructor(private http: HttpClient) { }
  // getStocks(): Observable<Stock[]> {
  //   return this.http.get<Stock[]>(this.serviceUrl)
  // }
  //------
  // private serviceUrl = 'http://localhost:3000/stocks';
  // constructor(private http: HttpClient) { }
  // getStocks(): Observable<Stock[]> {
  //   return this.http.get<Stock[]>(this.serviceUrl)
  //   .filter((value: any) => {console.log(value[2]);return true;})
  // }
  //-------
  // private serviceUrl = 'http://localhost:3000/stocks';
  // constructor(private http: HttpClient) { }
  // getStocks(query = {}): Observable<Stock[]> {
  //   return this.http.get<Stock[]>(this.serviceUrl)
  //   .filter((value: any) => {console.log(value);return true;})
  // }
  //--------
  // private stocks = [];
  // constructor(http:Http) {
  //   http.get('http://localhost:3000/stocks')
  //       .flatMap((response) => response.json())
  //       .filter((person: any) => person.branchId > 2)
  //       .subscribe((data) => {
  //         this.stocks.push(data);
  //       });
  // }

  
}