import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Similarity } from '../Globals';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SimilarityService {

  constructor(private http: HttpClient,
    public similarity: Similarity) { }

  getSpaces(): Observable<any> {
    const url: string = environment.baseUrl_smanage + 'spaces';
    return this.http.get(url);
  }
  search(space_name: string, version: string): Observable<any> {
    const formData = new FormData();
    formData.append('SDF', this.similarity.file);
    const url: string = environment.baseUrl_search + 'space/' + space_name + '/version/' + version;
    return this.http.put(url, formData);
  }
}
