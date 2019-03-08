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
  getParameters(modelname: string): Observable<any> {
    const url: string = environment.baseUrl + 'get_parameters';
    let params = new HttpParams();
    params = params.set('modelName', modelname);
    return this.http.get(url, { params: params });
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
}
