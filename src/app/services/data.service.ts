import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService {

	//baseUrl:string = "http://localhost:3000";
	baseUrl:string = "http://my-json-server.typicode.com/mduve/services";


	constructor(private httpClient : HttpClient) { 

	}

	get_branches(){
	    return this.httpClient.get(this.baseUrl + '/branches');
	}
	get_stocks(test){
	    return this.httpClient.get(this.baseUrl + '/stocks?branchId=' + test);
	}

}