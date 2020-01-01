import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ClassesComponent } from './classes/classes.component';
import { StudentComponent } from './student/student.component';
import { ShopComponent } from './shop/shop.component';
import { ShopListComponent } from './shop/shop-list/shop-list.component';
import { MainNavComponent } from './navigation/main-nav/main-nav.component';
import { ShopClassComponent } from './shop/shop-class/shop-class.component';
import { ManagementComponent } from './management/management.component';
import { ManagementNavComponent } from './navigation/management-nav/management-nav.component';
import { HttpClientModule } from '@angular/common/http';
import { LessonsService } from './services/lessons.service';
import { LessonCreateComponent } from './classes/lesson-create/lesson-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from './angular-material.module';



@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    ClassesComponent,
    StudentComponent,
    ShopComponent,
    ShopListComponent,
    ShopClassComponent,
    ManagementComponent,
    ManagementNavComponent,
    LessonCreateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularMaterialModule
  ],
  providers: [LessonsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
