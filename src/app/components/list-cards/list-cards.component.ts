import { Component, OnInit } from '@angular/core';
import { CardService } from '../../services/card.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-cards',
  templateUrl: './list-cards.component.html',
  styleUrls: ['./list-cards.component.sass']
})
export class ListCardsComponent implements OnInit {
  // Search filter term variable
  term: string;

  constructor(public cardService: CardService, public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.cardService.listCards()
    .subscribe((res: any[]) => {
      this.cardService.data = res;
      console.log(this.cardService.data);
    }, error => console.log(error));
  }

  removeCard(id: number) {
    this.cardService.deleteCard(id)
    .subscribe((res: any[]) => {
      this.cardService.data = this.cardService.data.filter((e: any) => e.id !== id);
      this.snackBar.open('Card is deleted!', '', {
        duration: 2000,
      });
      console.log(res);
    });
  }
}
