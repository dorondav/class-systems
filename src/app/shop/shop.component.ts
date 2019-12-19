import { Component, OnInit } from '@angular/core';
import { faWallet, faTrophy, faSign } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  faWallet = faWallet;
  faTrophy = faTrophy;
  faSign = faSign;
  constructor() { }
  ngOnInit() {
  }
}
