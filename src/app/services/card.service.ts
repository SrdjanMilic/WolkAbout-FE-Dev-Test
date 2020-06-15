import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Card } from '../models/card.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  API_SERVER = 'http://localhost:3000/sensors';

  cards: any[];
  date = new Date();

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  listCards() {
    return this.http.get(this.API_SERVER)
      .subscribe((res: any[]) => {
        this.cards = res;
        console.log(this.cards);
      }, error => console.log(error));
  }

  addCard(card: Card) {
    card.lastUpdate = this.date.getTime();
    return this.http.post(this.API_SERVER, card)
      .subscribe(() => {
        this.snackBar.open('Card is created.', '', {
          duration: 1500,
        });
        console.log('Submitted to database.');
      }, error => {
        this.snackBar.open('Error has occur: ' + error, '', {
          duration: 1500,
        });
        console.log(error);
      });
  }

  editCard(card: Card) {
    card.lastUpdate = this.date.getTime();
    return this.http.put(`${this.API_SERVER}/${card.id}`, card)
    .subscribe(() => {
      this.snackBar.open('Card is updated.', '', {
        duration: 1500,
      });
      console.log('Card is updated.');
    }, error => {
      this.snackBar.open('Error has occur.', '', {
        duration: 1500,
      });
      console.log(error);
    });
  }

  getCard(id: string): Observable<object> {
    console.log(id);
    return this.http.get(`${this.API_SERVER}/${id}`);
  }

  deleteCard(id: number) {
    return this.http.delete(`${this.API_SERVER}/${id}`)
      .subscribe((res: any[]) => {
        this.cards = this.cards.filter((e: any) => e.id !== id);
        this.snackBar.open('Card is deleted.', '', {
          duration: 1500,
        });
        console.log(res);
      }, error => {
        this.snackBar.open('Error has occur.', '', {
          duration: 1500,
        }), console.log(error);
      });
  }
}
