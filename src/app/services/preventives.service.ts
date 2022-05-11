import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { LoadPreventives } from '../interfaces/load-preventives';
import { Preventive } from '../models/preventives.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class PreventivesService {

  constructor(  private http: HttpClient) { }

  /** ================================================================
   *   GET TOKEN
  ==================================================================== */
  get token():string {
    return localStorage.getItem('token') || '';
  }

  /** ================================================================
   *   GET HEADERS
  ==================================================================== */
  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  /** ================================================================
   *   LOAD PREVENTIVES
  ==================================================================== */
  loadPreventives(desde: number, limite: number){
    return this.http.get<LoadPreventives>(`${base_url}/preventives?desde=${desde}&limite=${limite}`, this.headers);
  }

  /** ================================================================
   *   CREATE PREVENTIVES
  ==================================================================== */
  createPreventives( formData: any ){
    return this.http.post<{ok: boolean, preventive: Preventive}>(`${base_url}/preventives`, formData, this.headers);
  }

  // FIN DE LA CLASE
}
