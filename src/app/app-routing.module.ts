import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShopComponent } from './shop/shop.component';
import { ClassesComponent } from './classes/classes.component';
import { ShopListComponent } from './shop/shop-list/shop-list.component';


const routes: Routes = [
  { path: '', component: ShopComponent },
  { path: 'join', component: ShopComponent },
  { path: 'location-and-program', component: ShopListComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
