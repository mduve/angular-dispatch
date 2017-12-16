import { Injectable }   from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient }   from '@angular/common/http';
import { Observable }   from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Stock } from '../models/stock.model';

@Injectable()
export class StocksService {

  //private baseUrl:string = "http://localhost:3000";
  private baseUrl = 'http://my-json-server.typicode.com/mduve/services';
  private branchId = null;


  constructor(
    private httpClient : HttpClient,
    private http: HttpClient) { 

  }

  get_branches(){
      return this.httpClient.get(this.baseUrl + '/branches');
  }
  get_stocks(value){
      this.branchId = value;
      return this.httpClient.get(this.baseUrl + '/stocks?branchId=' + this.branchId);
  }

  getStocks(): Observable<Stock[]> {
    return this.http.get<Stock[]>(this.baseUrl + '/stocks?branchId=' + this.branchId);
  }

}