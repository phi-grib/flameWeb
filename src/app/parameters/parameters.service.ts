import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParametersService {

  constructor(private http: HttpClient) { }

  /**
   * @param modelname The model name to recieve parameters
   * Version will be automatically set to 'dev'
   */
  getParameters(model: string, version: string): Observable<any> {
    const url: string = environment.baseUrl_manage + 'models/' + model + '/version/' + version + '/parameters';
    return this.http.get(url);
  }
}
