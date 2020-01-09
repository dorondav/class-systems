import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShopComponent } from './shop/shop.component';
import { ShopListComponent } from './shop/shop-list/shop-list.component';
import { ShopClassComponent } from './shop/shop-class/shop-class.component';
import { ManagementComponent } from './management/management.component';
import { ClassesComponent } from './classes/classes.component';
import { LessonCreateComponent } from './classes/lesson-create/lesson-create.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';


const routes: Routes = [
  { path: '', component: ShopComponent },
  { path: 'join', component: ShopComponent },
  {
    path: 'location-and-program', component: ShopListComponent, children: [
      { path: ':id', component: ShopClassComponent }
    ]
  },
  {
    path: 'management', component: ManagementComponent
  },
  { path: 'classes', component: ClassesComponent },
  { path: 'create-lesson', component: LessonCreateComponent },
  { path: 'edit-lesson/:lessonId', component: LessonCreateComponent },

  // Login routs
  { path: 'profile', component: AuthComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registresion', component: RegisterComponent },
  { path: 'edit-user/:userId', component: RegisterComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
