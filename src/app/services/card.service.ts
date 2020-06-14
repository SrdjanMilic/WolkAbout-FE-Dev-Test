import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Card } from '../models/card.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  API_SERVER = 'http://localhost:3000/sensors';

  date = new Date();

  constructor(public http: HttpClient) { }

  listCards(): Observable<any> {
    return this.http.get(this.API_SERVER);
  }

  addCard(card: Card): Observable<object> {
    card.lastUpdate = this.date.getTime();
    return this.http.post(this.API_SERVER, card);
  }

  editCard(card: Card): Observable<object> {
    card.lastUpdate = this.date.getTime();
    return this.http.put(`${this.API_SERVER}/${card.id}`, card);
  }

  getCard(id: string): Observable<any> {
    return this.http.get(`${this.API_SERVER}/${id}`);
  }

  deleteCard(id: number): Observable<any> {
    return this.http.delete(`${this.API_SERVER}/${id}`);
  }
}
