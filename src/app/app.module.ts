import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatIconModule, MatButtonModule, MatSidenavModule, MatListModule } from '@angular/material';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ClassesComponent } from './classes/classes.component';
import { StudentComponent } from './student/student.component';
import { ShopComponent } from './shop/shop.component';
import { ShopListComponent } from './shop/shop-list/shop-list.component';
import { MainNavComponent } from './navigation/main-nav/main-nav.component';
import { ShopClassComponent } from './shop/shop-class/shop-class.component';
import { ManagementComponent } from './management/management.component';


@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    ClassesComponent,
    StudentComponent,
    ShopComponent,
    ShopListComponent,
    ShopClassComponent,
    ManagementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    FontAwesomeModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
