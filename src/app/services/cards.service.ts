import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CardsService {
  API_SERVER = 'http://localhost:3000/sensors';

  data: any = [];

  constructor(public httpClient: HttpClient, public snackBar: MatSnackBar) { }

  listCards() {
    return this.httpClient
      .get(this.API_SERVER)
      .subscribe((res: any[]) => {
        this.data = res;
        console.log(this.data);
      });
  }
}
