import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BuildService {

  constructor(private http: HttpClient) { }

  /**
   * Retrives the list of all models form the server
   */
  getModelList(): Observable<any> {
    const url: string = environment.baseUrl_manage + 'models';
    return this.http.get(url);
  }

  getModel(model: string, version: string): Observable<any> {
    const url: string = environment.baseUrl_manage + 'models/' + model + '/version/' + version;
    return this.http.get(url);
  }
  /**
   * Call to the server to create a new model with the given name
   * @param model Name of the model to add
   */
  createModel(model: string): Observable<any> {
    const url: string = environment.baseUrl_manage + 'models/' + model;
    return this.http.post(url, null);
  }

  deleteModel(model: string): Observable<any>  {
    const url: string = environment.baseUrl_manage + 'models/' + model;
    return this.http.delete(url);
  }

  deleteVersion(model: string, version: string) {
    const url: string = environment.baseUrl_manage + 'models/' + model + '/version/' + version;
    return this.http.delete(url);
  }

  cloneModel() {

  }


}
