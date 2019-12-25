import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShopComponent } from './shop/shop.component';
import { ShopListComponent } from './shop/shop-list/shop-list.component';
import { ShopClassComponent } from './shop/shop-class/shop-class.component';
import { ManagementComponent } from './management/management.component';
import { ClassesComponent } from './classes/classes.component';
import { ClassDetailComponent } from './classes/class-detail/class-detail.component';
import { LessonCreateComponent } from './classes/lesson-create/lesson-create.component';


const routes: Routes = [
  { path: '', component: ShopComponent },
  { path: 'join', component: ShopComponent },
  {
    path: 'location-and-program', component: ShopListComponent, children: [
      { path: ':id', component: ShopClassComponent }
    ]
  },
  { path: 'management', component: ManagementComponent },
  { path: 'classes', component: ClassesComponent },
  { path: 'create-lesson', component: LessonCreateComponent },
  { path: 'edit-lesson/:lessonId', component: LessonCreateComponent }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
