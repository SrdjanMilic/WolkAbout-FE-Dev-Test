import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Card } from '../models/card.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  API_SERVER = 'http://localhost:3000/sensors';

  public cardsSource$: BehaviorSubject<Array<object>> = new BehaviorSubject<Array<object>>([]);

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  getCardList() {
    return this.http.get(this.API_SERVER)
      .subscribe((res: Array<object>) => {
        this.cardsSource$.next(res);
      }, error => {
        this.snackBar.open('Error has occur', '', {
          duration: 1500,
        });
        console.log(error);
      });
  }

  addCard(card: Card) {
    return this.http.post(this.API_SERVER, card)
      .subscribe(() => {
        this.snackBar.open('Card is created', '', {
          duration: 1500,
        });
        console.log(card);
      }, error => {
        this.snackBar.open('Error has occur', '', {
          duration: 1500,
        });
        console.log(error);
      });
  }

  editCard(id: number, card: Card) {
    return this.http.put(`${this.API_SERVER}/${id}`, card)
      .subscribe(() => {
        this.snackBar.open('Card is updated', '', {
          duration: 1500,
        });
        console.log(card);
      }, error => {
        this.snackBar.open('Error has occur', '', {
          duration: 1500,
        });
        console.log(error);
      });
  }

  getCard(id: number): Observable<any> {
    return this.http.get(`${this.API_SERVER}/${id}`);
  }

  deleteCard(id: number) {
    return this.http.delete(`${this.API_SERVER}/${id}`)
      .subscribe((res: any) => {
        this.snackBar.open('Card is deleted', '', {
          duration: 1500,
        });
        console.log(res);
      }, error => {
        this.snackBar.open('Error has occur', '', {
          duration: 1500,
        }), console.log(error);
      });
  }
}
