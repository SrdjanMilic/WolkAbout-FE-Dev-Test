import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCardComponent } from './components/add-card/add-card.component';
import { ListCardsComponent } from './components/list-cards/list-cards.component';
import { EditCardComponent } from './components/edit-card/edit-card.component';

const routes: Routes = [
  {path: '', redirectTo: 'list-cards', pathMatch: 'full'},
  {path: 'list-cards', component: ListCardsComponent},
  {path: 'add-card', component: AddCardComponent},
  {path: 'edit-card/:id', component: EditCardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
