
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewmodelService {

  constructor(private http: HttpClient) { }

  /**
   * @param modelname The model name to recieve parameters
   * Version will be automatically set to 'dev'
   */
  getParameters(modelname: string): Observable<any> {
    const url: string = environment.baseUrl + 'get_parameters';
    let params = new HttpParams();
    params = params.set('modelName', modelname);
    return this.http.get(url, { params: params });
  }
}

