import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Model} from '../Model';


@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  constructor(private http: HttpClient, private model: Model) { }


  buildModel(): Observable<any> {

    const formData = new FormData();
    formData.append('SDF', this.model.file);
    formData.append('parameters', JSON.stringify(this.model.parameters));
    //formData.append('parameters',  this.model.parameters);
    const url: string = environment.baseUrl_build + 'models/' + this.model.name;
    alert("Send");
    return this.http.post(url, formData);
  }
}
