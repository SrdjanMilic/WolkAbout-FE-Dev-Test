import { Component, OnInit } from '@angular/core';
import { CardsService } from '../../services/cards.service';

@Component({
  selector: 'app-list-cards',
  templateUrl: './list-cards.component.html',
  styleUrls: ['./list-cards.component.sass']
})
export class ListCardsComponent implements OnInit {

  constructor(public cardsService: CardsService) { }

  ngOnInit(): void {
    this.cardsService.listCards();
  }

}
