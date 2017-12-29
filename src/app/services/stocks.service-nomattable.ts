import { Injectable }   from '@angular/core';
import { HttpClient }   from '@angular/common/http';
import { Stock } from '../models/stock.model';

@Injectable()
export class StocksService {

  //private baseUrl:string = "http://localhost:3000";
  private baseUrl = 'http://my-json-server.typicode.com/mduve/services';
  private branchId = null;


  constructor(
    private httpClient : HttpClient,
  ) { }

  get_branches(){
      return this.httpClient.get(this.baseUrl + '/branches');
  }
  get_stocks(value){
      this.branchId = value;
      return this.httpClient.get(this.baseUrl + '/stocks?branchId=' + this.branchId);
  }

}