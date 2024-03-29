import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditBookComponent } from './edit-book/edit-book.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  route: Routes =[
    // {path:'book/:id/edit', component: EditBookComponent, title:'Book Edit'}
  ]


 }
