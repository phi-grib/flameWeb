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
  getModels(): Observable<any> {
    const url: string = environment.baseUrl_manage + 'models';
    return this.http.get(url);
  }
  /**
   * Call to the server to create a new model with the given name
   * @param model Name of the model to add
   */
  createNewModel(model: string): Observable<any> {
    const url: string = environment.baseUrl + 'new_model';
    let params = new HttpParams();
    params = params.set('model', model);
    return this.http.get(url, { params: params });
  }
  /**
   * Retrieves all the model info
   * @param model name of the model to retrieve the info
   * @param version version of the model to retrieve the info
   * @param output desired output  of the server method
   * @return the response with the model data and the response data
   */
  getModelInfo(model: string, version: string): Observable<any> {
    const url: string = environment.baseUrl + 'modelInfo';
    let params = new HttpParams();
    params = params.set('model', model).set('version', version);
    return this.http.get(url, { params: params });
  }

  getAll(): Observable<any> {
    const url: string = environment.baseUrl + 'get_info_models';
    return this.http.get(url);
  }

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
