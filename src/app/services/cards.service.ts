import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Card } from '../models/card.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CardsService {
  API_SERVER = 'http://localhost:3000/sensors';

  data: any = [];

  constructor(public http: HttpClient, public snackBar: MatSnackBar) { }

  listCards() {
    return this.http
      .get(this.API_SERVER)
      .subscribe((res: any[]) => {
        this.data = res;
        console.log(this.data);
      });
  }

  createCard(card: Card) {
    return this.http
      .post(this.API_SERVER, card)
      .subscribe(() => {
        this.snackBar.open('Card is created!', '', {
          duration: 2000,
        });
        console.log(`Submitted to database!`);
      });
  }

  editCard(card: Card) {
    return this.http
      .put(this.API_SERVER, card)
      .subscribe(() => {
        this.snackBar.open('Card is updated!', '', {
          duration: 2000,
        });
        console.log(`Submitted to database!`);
      });
  }

  deleteCard(id: number) {
    return this.http
      .delete(`${this.API_SERVER}/${id}`)
      .subscribe((res: any[]) => {
        this.data = this.data.filter((x) => x.id !== id);
        this.snackBar.open('Card is deleted!', '', {
          duration: 2000,
        });
        console.log(res);
      });
  }
}
