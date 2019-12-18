import { Component } from '@angular/core';
import { faWallet, faTrophy, faSign } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  faWallet = faWallet;
  faTrophy = faTrophy;
  faSign = faSign;
  title = 'classes';
}
