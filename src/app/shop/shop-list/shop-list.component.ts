import { Component, OnInit } from '@angular/core';
import { faEdit, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.css']
})
export class ShopListComponent implements OnInit {
  faEdit = faEdit;
  faSignInAlt = faSignInAlt;
  constructor() { }

  ngOnInit() {
  }

}
